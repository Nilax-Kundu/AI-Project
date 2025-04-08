document.addEventListener("DOMContentLoaded", () => {
  const bmiForm = document.getElementById("bmi-form")
  const resultCard = document.getElementById("result-card")
  const bmiValue = document.getElementById("bmi-value")
  const bmiCategory = document.getElementById("bmi-category")
  const bmiSuggestion = document.getElementById("bmi-suggestion")
  const meterPointer = document.getElementById("meter-pointer")

  if (bmiForm) {
    bmiForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const age = Number.parseInt(document.getElementById("age").value)
      const gender = document.querySelector('input[name="gender"]:checked').value
      const height = Number.parseInt(document.getElementById("height").value) / 100 // Convert cm to meters
      const weight = Number.parseInt(document.getElementById("weight").value)

      // Calculate BMI
      const bmi = calculateBMI(weight, height)

      // Display result
      displayResult(bmi, age, gender)
    })
  }

  function calculateBMI(weight, height) {
    // BMI formula: weight (kg) / (height (m) * height (m))
    return (weight / (height * height)).toFixed(1)
  }

  function displayResult(bmi, age, gender) {
    // Show result card
    resultCard.classList.remove("hidden")

    // Set BMI value
    bmiValue.textContent = bmi

    // Determine BMI category and position meter pointer
    let category, suggestion, pointerPosition

    if (bmi < 18.5) {
      category = "Underweight"
      suggestion =
        "Consider increasing your caloric intake with nutrient-dense foods. Focus on strength training to build muscle mass."
      pointerPosition = 12.5 // 25% of first quarter
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal Weight"
      suggestion = "Maintain your healthy weight with regular exercise and balanced nutrition."
      pointerPosition = 37.5 // Middle of second quarter
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight"
      suggestion = "Consider a moderate calorie deficit and increased physical activity to reach a healthier weight."
      pointerPosition = 62.5 // Middle of third quarter
    } else {
      category = "Obese"
      suggestion = "Consult with a healthcare provider for a personalized weight management plan."
      pointerPosition = 87.5 // Middle of fourth quarter
    }

    // Set category and suggestion
    bmiCategory.textContent = category
    bmiSuggestion.textContent = suggestion

    // Position the pointer
    meterPointer.style.left = `${pointerPosition}%`

    // Add age and gender specific advice
    if (age > 65) {
      bmiSuggestion.textContent +=
        " As an older adult, focus on maintaining muscle mass through resistance training and adequate protein intake."
    }

    if (gender === "female") {
      bmiSuggestion.textContent +=
        " Women typically have higher body fat percentages than men, so consider body composition rather than just BMI."
    }
  }
})

