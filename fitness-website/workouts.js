document.addEventListener("DOMContentLoaded", () => {
  // Tab switching for workout plans
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach((b) => b.classList.remove("active"))
        tabContents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked button
        btn.classList.add("active")

        // Show corresponding content
        const tabId = btn.getAttribute("data-tab")
        document.getElementById(`${tabId}-content`).classList.add("active")
      })
    })
  }

  // Difficulty filter
  const toggleBtns = document.querySelectorAll(".toggle-btn")
  const exerciseCards = document.querySelectorAll(".exercise-card")

  if (toggleBtns.length > 0) {
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        toggleBtns.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked button
        btn.classList.add("active")

        // Filter exercises by difficulty
        const difficulty = btn.getAttribute("data-difficulty")

        exerciseCards.forEach((card) => {
          if (card.getAttribute("data-difficulty") === difficulty) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }

  // Meal plan tabs
  const mealTabs = document.querySelectorAll(".meal-tab")
  const mealContents = document.querySelectorAll(".meal-content")

  if (mealTabs.length > 0) {
    mealTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and contents
        mealTabs.forEach((t) => t.classList.remove("active"))
        mealContents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked tab
        tab.classList.add("active")

        // Show corresponding content
        const mealId = tab.getAttribute("data-meal")
        document.getElementById(`${mealId}-content`).classList.add("active")
      })
    })
  }
})

