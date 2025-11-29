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
      label: "要健康 · 清爽轻负担",
      emoji: "🥗",
      title: "想吃轻盈又有味道？",
      subtitle: "多点蔬菜与均衡搭配。"
    },
    together: {
      name: "多人局",
      label: "多人局 · 适合分享",
      emoji: "🍲",
      title: "挑一份大家都愿意的",
      subtitle: "为整桌人做推荐。"
    },
    now: {
      name: "马上吃",
      label: "马上吃 · 快且省心",
      emoji: "⚡",
      title: "要快、要省事？",
      subtitle: "简单快餐，等待更少。"
    }
  };

  const greetingEmoji = document.getElementById("greeting-emoji");
  const greetingTitle = document.getElementById("greeting-title");
  const greetingSubtitle = document.getElementById("greeting-subtitle");
  const modeLabel = document.getElementById("mode-label");
  const currentModeLabel = document.getElementById("current-mode-label");

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

      greetingEmoji.textContent = cfg.emoji;
      greetingTitle.textContent = cfg.title;
      greetingSubtitle.textContent = cfg.subtitle;
      modeLabel.textContent = cfg.label;
      currentModeLabel.textContent = `当前：${cfg.name}`;
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
    category: new Set(["中餐", "日料", "意面"]),
    style: new Set(["清淡", "健康"]),
    brand: new Set(["不辣", "中辣"]),
    color: new Set(["花生过敏", "海鲜过敏"]),
    size: new Set(["素食", "低脂"]),
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
      Math.round(32 + priceHeadroom - Math.max(0, totalSelected - 13))
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
  };

  if (modal && openBtn && closeBtn && applyBtn && priceRange && priceValue) {
    // Init slider
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
    });

    applyBtn.addEventListener("click", () => {
      updateResultsCount();
      updatePreview();
      // This is where a real recommendation refresh would trigger.
      closeModal();
    });
  }

  // Action detail interactions
  const detailCopy = {
    assist: {
      title: "帮我选 · 次级界面",
      desc: "基于你当前的口味、忌口和预算生成推荐清单。可直接查看推荐菜品或餐厅。"
    },
    manual: {
      title: "自己选 · 次级界面",
      desc: "进入自定义筛选面板，按菜系、口味、辣度、距离等条件进一步精细化选择。"
    },
    random: {
      title: "随便来 · 次级界面",
      desc: "为你抽取一张灵感卡，包含 3-5 个惊喜菜品/店铺，点击可立即下单或再抽一次。"
    }
  };

  const openDetail = action => {
    if (!detailOverlay || !detailSheet || !detailTitle || !detailDesc) return;
    const copy = detailCopy[action];
    detailTitle.textContent = copy ? copy.title : "推荐详情";
    detailDesc.textContent = copy ? copy.desc : "点击上方任意功能，查看对应的次级界面内容。";

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
});
