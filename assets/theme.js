(function () {
  var buttons = document.querySelectorAll("[data-theme-option]");
  var storageKey = "privacyPoliciesTheme";

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey) || "system";
    } catch (_error) {
      return "system";
    }
  }

  function saveTheme(theme) {
    try {
      if (theme === "system") {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, theme);
      }
    } catch (_error) {}
  }

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    } else {
      delete document.documentElement.dataset.theme;
    }

    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.themeOption === theme));
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var theme = button.dataset.themeOption || "system";
      saveTheme(theme);
      applyTheme(theme);
    });
  });

  applyTheme(getSavedTheme());
})();
