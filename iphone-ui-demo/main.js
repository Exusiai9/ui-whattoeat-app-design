// Navigation, mode switching, and preferences modal

document.addEventListener("DOMContentLoaded", () => {
  // Bottom nav routing
  const navTargets = {
    "nav-history": "history.html",
    "nav-home": "index.html",
    "nav-profile": "profile.html"
  };

  document.querySelectorAll(".glass-nav-group label[data-target]").forEach(label => {
    label.addEventListener("click", () => {
      const inputId = label.getAttribute("for");
      const target = navTargets[inputId];
      if (!target) return;
      const currentPage = document.body.getAttribute("data-page");
      if (
        (currentPage === "history" && target === "history.html") ||
        (currentPage === "home" && target === "index.html") ||
        (currentPage === "profile" && target === "profile.html")
      ) {
        return;
      }
      window.location.href = target;
    });
  });

  // Mode handling
  const modeConfig = {
    healthy: {
      name: "要健康",
      label: "要健康 · 更适合轻盈一点的搭配",
      title: "今晚少油少盐也好吃。",
      subtitle: "我会优先推荐更轻盈、低负担的选择。",
      icon: "ri-leaf-fill"
    },
    together: {
      name: "一起吃",
      label: "一起吃 · 适合多人局",
      title: "大家一起吃，别谁都迁就。",
      subtitle: "综合每个人口味，找一个都能接受的方案。",
      icon: "ri-team-fill"
    },
    now: {
      name: "这一顿",
      label: "这一顿 · 随便吃吃就好",
      title: "这顿别纠结，交给我选。",
      subtitle: "随机一点、随便一点，也可以很好吃。",
      icon: "ri-shuffle-fill"
    }
  };

  const greetingEmoji = document.getElementById("greeting-emoji");
  const greetingTitle = document.getElementById("greeting-title");
  const greetingSubtitle = document.getElementById("greeting-subtitle");
  const modeLabel = document.getElementById("mode-label");
  const currentModeLabel = document.getElementById("current-mode-label");
  const greetingIcon = greetingEmoji
    ? greetingEmoji.querySelector("i")
    : null;

  if (
    greetingEmoji &&
    greetingTitle &&
    greetingSubtitle &&
    modeLabel &&
    currentModeLabel
  ) {
    const setMode = mode => {
      const cfg = modeConfig[mode];
      if (!cfg) return;

      document.querySelectorAll(".mode-card-item").forEach(card => {
        card.classList.toggle("active", card.dataset.mode === mode);
      });

      document.querySelectorAll(".mode-dot").forEach(dot => {
        dot.classList.toggle("active", dot.dataset.mode === mode);
      });

      greetingTitle.textContent = cfg.title;
      greetingSubtitle.textContent = cfg.subtitle;
      modeLabel.textContent = cfg.label;
      currentModeLabel.textContent = `当前：${cfg.name}`;

      if (greetingIcon) {
        greetingIcon.className = cfg.icon;
      }
    };

    document.querySelectorAll(".mode-card-item").forEach(card => {
      card.addEventListener("click", () => setMode(card.dataset.mode));
    });

    document.querySelectorAll(".mode-dot").forEach(dot => {
      dot.addEventListener("click", () => setMode(dot.dataset.mode));
    });

    setMode("together");
  }

  // Preferences modal + state
  const modal = document.getElementById("preferences-modal");
  const openBtn = document.getElementById("open-preferences-btn");
  const closeBtn = document.getElementById("close-preferences-btn");
  const applyBtn = document.getElementById("apply-preferences-btn");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");
  const resultsCount = document.getElementById("results-count");
  const preview = document.getElementById("preferences-preview");
  const detailOverlay = document.getElementById("action-detail-overlay");
  const detailSheet = document.getElementById("action-detail-sheet");
  const detailTitle = document.getElementById("detail-title");
  const detailDesc = document.getElementById("detail-desc");
  const detailClose = document.getElementById("close-detail-btn");
  const assistMock = document.getElementById("assist-mock");
  const assistTrack = document.getElementById("assist-track");
  const assistDots = Array.from(
    document.querySelectorAll("[data-assist-dot]")
  );
  const assistRecoTitle = document.querySelector(".assist-reco-title");
  const assistRecoDesc = document.querySelector(".assist-reco-desc");
  let assistIndex = 0;

  const maxPrice = 200;
  const selections = {
    category: new Set(["中餐", "日料", "轻食"]),
    style: new Set(["清淡", "微辣"]),
    brand: new Set(["多人局"]),
    color: new Set(["花生过敏"]),
    size: new Set(["正常"]),
    price: maxPrice
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  const syncChips = () => {
    document.querySelectorAll(".filter-chip").forEach(chip => {
      const group = chip.dataset.filterGroup;
      const value = chip.dataset.value;
      const isActive = selections[group]?.has(value);
      chip.classList.toggle("active", Boolean(isActive));
      chip.setAttribute("aria-pressed", Boolean(isActive));
    });
  };

  const calculateResults = () => {
    const totalSelected =
      selections.category.size +
      selections.style.size +
      selections.brand.size +
      selections.color.size +
      selections.size.size;
    const priceHeadroom = Math.max(0, (maxPrice - selections.price) / 10);
    return Math.max(
      8,
      Math.round(32 + priceHeadroom - Math.max(0, totalSelected - 10))
    );
  };

  const updateResultsCount = () => {
    if (!resultsCount) return 0;
    const count = calculateResults();
    resultsCount.textContent = count;
    return count;
  };

  const updatePreview = () => {
    if (!preview) return;
    const textParts = [
      ...selections.category,
      ...selections.style,
      ...selections.brand,
      ...selections.color,
      ...selections.size,
      `人均 ¥${selections.price}`
    ];
    preview.textContent = textParts.join(" · ");
  };

  const handleChipToggle = chip => {
    const group = chip.dataset.filterGroup;
    const value = chip.dataset.value;
    if (!group || !value || !selections[group]) return;
    if (selections[group].has(value)) {
      selections[group].delete(value);
    } else {
      selections[group].add(value);
    }
    syncChips();
    updateResultsCount();
    updatePreview();
  };

  if (modal && openBtn && closeBtn && applyBtn && priceRange && priceValue) {
    priceRange.value = selections.price;
    priceValue.textContent = `¥${selections.price}`;

    syncChips();
    updateResultsCount();
    updatePreview();

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal();
    });

    document.querySelectorAll(".filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        handleChipToggle(chip);
      });
    });

    priceRange.addEventListener("input", event => {
      const value = Number(event.target.value);
      selections.price = value;
      priceValue.textContent = `¥${value}`;
      updateResultsCount();
      updatePreview();
    });

    applyBtn.addEventListener("click", () => {
      updateResultsCount();
      updatePreview();
      closeModal();
    });
  }

  // Action detail interactions
  const detailCopy = {
    assist: {
      title: "帮我选 · 次级界面",
      desc: "基于当前的口味、忌口和预算生成推荐清单。可直接查看推荐菜品或餐厅。"
    },
    manual: {
      title: "自己选 · 次级界面",
      desc: "进入自定义筛选面板，按菜系、口味、辣度、距离等条件进一步精细化选择。"
    },
    random: {
      title: "随便来 · 次级界面",
      desc: "为你抽取一张灵感卡，包含 3-5 个惊喜店铺，想换就再抽一次。"
    }
  };

  const openDetail = action => {
    if (!detailOverlay || !detailSheet || !detailTitle || !detailDesc) return;
    const copy = detailCopy[action];
    detailTitle.textContent = copy ? copy.title : "推荐详情";
    detailDesc.textContent = copy
      ? copy.desc
      : "点击上方任意功能，查看对应的次级界面内容。";

    if (assistMock) {
      const showAssist = action === "assist";
      assistMock.classList.toggle("show", showAssist);
      assistMock.setAttribute("aria-hidden", showAssist ? "false" : "true");
      detailDesc.style.display = showAssist ? "none" : "block";

      if (showAssist) {
        assistIndex = 0;
        updateAssistSlider(assistIndex);
      }
    }

    detailOverlay.classList.add("open");
    detailOverlay.setAttribute("aria-hidden", "false");
  };

  const closeDetail = () => {
    if (!detailOverlay) return;
    detailOverlay.classList.remove("open");
    detailOverlay.setAttribute("aria-hidden", "true");
    if (assistMock) {
      assistMock.classList.remove("show");
      assistMock.setAttribute("aria-hidden", "true");
    }
    if (detailDesc) {
      detailDesc.style.display = "block";
    }
  };

  document.querySelectorAll(".action-tile[data-action]").forEach(tile => {
    tile.addEventListener("click", () => {
      openDetail(tile.dataset.action);
    });
  });

  if (detailClose) {
    detailClose.addEventListener("click", closeDetail);
  }
  if (detailOverlay) {
    detailOverlay.addEventListener("click", event => {
      if (event.target === detailOverlay) closeDetail();
    });
  }

  // Assist slider interactions
  const assistRecoCopy = [
    {
      title: "AI 推荐 · 偏好匹配",
      desc: "为你挑选多人局友好、口味较清淡的餐厅，价格均衡且评分稳定。"
    },
    {
      title: "AI 推荐 · 口碑爆款",
      desc: "看看周边热度较高、出品稳定的菜品组合，适合小聚分享。"
    },
    {
      title: "AI 推荐 · 速决方案",
      desc: "主打快速出餐与便捷取餐，让大家尽快吃上。"
    },
    {
      title: "AI 推荐 · 舒适氛围",
      desc: "环境舒适、适合聊天的选择，口味中度，甜点饮品也不错。"
    },
    {
      title: "AI 推荐 · 尝鲜灵感",
      desc: "提供 3-5 个新鲜口味与限定菜，适合想试试新花样的你。"
    }
  ];

  const applyAssistCopy = index => {
    if (!assistRecoTitle || !assistRecoDesc) return;
    const copy = assistRecoCopy[index] || assistRecoCopy[0];
    assistRecoTitle.textContent = copy.title;
    assistRecoDesc.textContent = copy.desc;
  };

  const updateAssistSlider = index => {
    if (!assistTrack || !assistDots.length) return;
    const safeIndex = Math.max(0, Math.min(index, assistDots.length - 1));
    assistIndex = safeIndex;
    assistTrack.style.transform = `translateX(${-assistIndex * 100}%)`;
    assistDots.forEach((dot, idx) =>
      dot.classList.toggle("active", idx === assistIndex)
    );
    applyAssistCopy(assistIndex);
  };

  assistDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = Number(dot.dataset.assistDot);
      if (Number.isFinite(idx)) {
        updateAssistSlider(idx);
      }
    });
  });

  let pointerDown = false;
  let startX = 0;
  let currentDelta = 0;

  const onPointerDown = event => {
    if (!assistTrack || !assistMock || !assistMock.classList.contains("show"))
      return;
    pointerDown = true;
    startX = event.touches ? event.touches[0].clientX : event.clientX;
    assistTrack.style.transition = "none";
  };

  const onPointerMove = event => {
    if (!pointerDown || !assistTrack) return;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX;
    currentDelta = deltaX;
    const percent = (deltaX / assistTrack.clientWidth) * 100;
    assistTrack.style.transform = `translateX(calc(${-assistIndex * 100}% + ${percent}%))`;
  };

  const onPointerUp = () => {
    if (!pointerDown || !assistTrack) return;
    pointerDown = false;
    assistTrack.style.transition = "transform 0.25s ease";
    const threshold = assistTrack.clientWidth * 0.15;
    if (currentDelta > threshold) {
      updateAssistSlider(assistIndex - 1);
    } else if (currentDelta < -threshold) {
      updateAssistSlider(assistIndex + 1);
    } else {
      updateAssistSlider(assistIndex);
    }
    currentDelta = 0;
  };

  if (assistTrack) {
    ["mousedown", "touchstart"].forEach(evt =>
      assistTrack.addEventListener(evt, onPointerDown, { passive: true })
    );
    ["mousemove", "touchmove"].forEach(evt =>
      assistTrack.addEventListener(evt, onPointerMove, { passive: true })
    );
    ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(evt =>
      assistTrack.addEventListener(evt, onPointerUp)
    );
  }

  // Dish detail navigation from assist images
  document.querySelectorAll(".assist-img").forEach(img => {
    img.addEventListener("click", () => {
      window.location.href = "dish-detail.html";
    });
  });

  // Dish detail quantity
  const qtyValue = document.getElementById("detail-qty");
  const updateQty = delta => {
    if (!qtyValue) return;
    const current = Number(qtyValue.textContent) || 1;
    const next = Math.max(1, current + delta);
    qtyValue.textContent = next;
  };
  document.querySelectorAll("[data-qty-btn]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.qtyBtn;
      if (type === "plus") updateQty(1);
      if (type === "minus") updateQty(-1);
    });
  });

  // Profile page quick links & menu navigation
  const attachNavigation = element => {
    const target = element.dataset.targetPage;
    if (!target) return;
    const navigate = () => {
      window.location.href = target;
    };
    element.addEventListener("click", navigate);
    element.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigate();
      }
    });
  };

  document
    .querySelectorAll("[data-target-page]")
    .forEach(el => attachNavigation(el));

  // History tabs, swipe weeks, and day selection
  if (document.body.getAttribute("data-page") === "history") {
    const tabs = Array.from(document.querySelectorAll(".history-tab"));
    const panels = Array.from(document.querySelectorAll(".history-panel"));
    const calendar = document.getElementById("history-calendar");
    const weekLabelEl = document.getElementById("history-week-label");
    const dayNumberEl = document.getElementById("history-day-number");
    const monthEl = document.getElementById("history-month");
    const yearEl = document.getElementById("history-year");
    const weekdayEl = document.getElementById("history-weekday");
    const dayContainer = document.getElementById("history-days");
    const mealListEl = document.getElementById("history-meal-list");

    const weekdayLabels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

    const weeks = [
      {
        label: "2月 第2周",
        day: 11,
        month: "FEBRUARY",
        year: "2025",
        days: [8, 9, 10, 11, 12, 13, 14],
        meals: {
          11: [
            { time: "12:30", meal: "午餐", name: "烤鸭卷饼", style: "低油少盐", service: "堂食" },
            { time: "18:30", meal: "晚餐", name: "口水鸡", style: "微辣", service: "外卖" }
          ],
          10: [{ time: "12:10", meal: "午餐", name: "沙拉", style: "轻食", service: "烹饪" }],
          9: [{ time: "08:30", meal: "早饭", name: "燕麦酸奶", style: "低脂", service: "烹饪" }]
        }
      },
      {
        label: "2月 第3周",
        day: 18,
        month: "FEBRUARY",
        year: "2025",
        days: [15, 16, 17, 18, 19, 20, 21],
        meals: {
          18: [{ time: "13:00", meal: "午餐", name: "番茄炖牛腩", style: "高蛋白", service: "堂食" }],
          17: [{ time: "19:00", meal: "晚餐", name: "意面", style: "番茄肉酱", service: "外卖" }]
        }
      }
    ];

    let currentWeek = 0;
    let selectedDay = weeks[0].day;

    const renderMeals = () => {
      if (!mealListEl) return;
      const meals = weeks[currentWeek].meals[selectedDay] || [];
      mealListEl.innerHTML =
        meals.length === 0
          ? '<div class="placeholder-text">当日暂无用餐记录</div>'
          : meals
              .map(
                item =>
                  `<div class="history-meal-card">
                    <div class="history-meal-head">
                      <div class="history-meal-info">
                        <div class="history-meal-title">${item.time} · ${item.meal} · ${item.name}</div>
                        <div class="history-meal-meta">${item.style || ""} · ${item.service || ""}</div>
                      </div>
                      <button class="history-feedback-btn" type="button">反馈</button>
                    </div>
                  </div>`
              )
              .join("");
    };

    const renderWeek = () => {
      const wk = weeks[currentWeek];
      if (!wk.days.includes(selectedDay)) {
        selectedDay = wk.day;
      }
      if (weekLabelEl) weekLabelEl.textContent = wk.label;
      if (dayNumberEl) {
        dayNumberEl.textContent = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
      }
      if (monthEl) monthEl.textContent = wk.month;
      if (yearEl) yearEl.textContent = wk.year;
      const dayIdx = wk.days.indexOf(selectedDay);
      if (weekdayEl) {
        weekdayEl.textContent = dayIdx >= 0 ? weekdayLabels[dayIdx] : "";
      }
      if (dayContainer) {
        dayContainer.innerHTML = "";
        wk.days.forEach((dayVal, idx) => {
          const btn = document.createElement("button");
          btn.className = "history-day-circle";
          btn.dataset.day = String(dayVal);
          btn.textContent = dayVal;
          const count = (wk.meals[dayVal] || []).length;
          if (count > 0) {
            const alpha = Math.min(0.2 + count * 0.18, 0.85);
            btn.style.background = `rgba(255, 107, 0, ${alpha})`;
            btn.style.color = alpha > 0.45 ? "#ffffff" : "#0c0c0c";
          }
          if (dayVal === selectedDay) btn.classList.add("selected");
          btn.addEventListener("click", () => {
            selectedDay = dayVal;
            const dayIndex = (idx % 7 + 7) % 7;
            if (weekdayEl) weekdayEl.textContent = weekdayLabels[dayIndex];
            renderWeek();
            renderMeals();
          });
          dayContainer.appendChild(btn);
        });
      }
      renderMeals();
    };

    const setTab = key => {
      tabs.forEach(tab => {
        const active = tab.dataset.tab === key;
        tab.classList.toggle("active", active);
      });
      panels.forEach(panel => {
        const show = panel.dataset.panel === key;
        panel.setAttribute("aria-hidden", show ? "false" : "true");
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => setTab(tab.dataset.tab));
    });

    // Swipe to change weeks
    if (calendar) {
      let swipeStartX = 0;
      let swiping = false;
      const onSwipeStart = e => {
        swiping = true;
        swipeStartX = e.touches ? e.touches[0].clientX : e.clientX;
      };
      const onSwipeEnd = e => {
        if (!swiping) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const delta = endX - swipeStartX;
        const threshold = 50;
        if (delta > threshold && currentWeek > 0) {
          currentWeek -= 1;
          renderWeek();
        } else if (delta < -threshold && currentWeek < weeks.length - 1) {
          currentWeek += 1;
          renderWeek();
        }
        swiping = false;
      };
      ["mousedown", "touchstart"].forEach(evt =>
        calendar.addEventListener(evt, onSwipeStart, { passive: true })
      );
      ["mouseup", "touchend"].forEach(evt =>
        calendar.addEventListener(evt, onSwipeEnd)
      );
    }

    renderWeek();
    renderMeals();

    // Hero carousel dots
    const heroTrack = document.getElementById("trend-hero-track");
    const heroDots = Array.from(document.querySelectorAll("[data-hero-target]"));
    const setHeroDot = idx => {
      heroDots.forEach(dot => {
        dot.classList.toggle("active", Number(dot.dataset.heroTarget) === idx);
      });
    };
    if (heroTrack && heroDots.length) {
      const scrollToIndex = idx => {
        const width = heroTrack.clientWidth;
        heroTrack.scrollTo({ left: width * idx, behavior: "smooth" });
        setHeroDot(idx);
      };
      heroDots.forEach(dot => {
        dot.addEventListener("click", () => scrollToIndex(Number(dot.dataset.heroTarget)));
      });
      heroTrack.addEventListener("scroll", () => {
        const width = heroTrack.clientWidth || 1;
        const idx = Math.round(heroTrack.scrollLeft / width);
        setHeroDot(Math.max(0, Math.min(idx, heroDots.length - 1)));
      });
      setHeroDot(0);
    }
  }
});
