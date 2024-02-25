async function calculateCreditScore() {

    const creditScore = document.getElementById("creditScoreSlider").value;
    const creditHistory = document.getElementById("creditHistory").value;
    const missedPayments = document.getElementById("missedPayments").value;
    const creditCards = document.getElementById("creditCards").value;
    const carPayment = document.getElementById("carPayment").value;
    const housePayment = document.getElementById("housePayment").value;
    const outstandingPayments = document.getElementById("outstandingPayments").value;
    const action = document.getElementById("action").value;

    const prompt = `A person has a credit score of ${creditScore}, ${creditHistory} years of credit history, 
    ${missedPayments} missed payments, ${creditCards} credit cards, ${carPayment} dollars outstanding on their car
    payment, ${housePayment} dollars oustanding on their house payment, and ${outstandingPayments} dollars
    outstanding on other payments.
    They want to ${action}$. Estimate how their credit score will change and enclose the number with % on the front
    and end like this %+5% or %-5%. You should output a positive or negative number. Don't provide an explanation.`

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: "gpt-4-turbo-preview",
                messages: [{
                    role: "system",
                    content: "Calculate the final ratio and estimated credit score based on the provided credit information."
                }, {
                    role: "user",
                    content: prompt
                }]
            }),
        });

        const data = await response.json();
        console.log(data);

        const responseText = data.choices && data.choices.length > 0 ? data.choices[0].message.content : "Could not calculate score.";
        console.log(responseText);

        const match = responseText.match(/%([^%]+)%/);
        if (match && match[1]) {
            console.log(match[1]);

            // Parse the original credit score and the change value as integers
            const originalScore = parseInt(creditScore, 10);
            const scoreChange = parseInt(match[1], 10);

            // Calculate the updated score
            const updatedScore = originalScore + scoreChange;

            // Display the updated score
            document.getElementById("result").innerHTML = updatedScore.toString();
        } else {
            document.getElementById("result").innerHTML = "Could not calculate score.";
        }
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

function typeLetters(elementId, text, typingDelay = 100, loopDelay = 2000) {
    let elem = document.getElementById(elementId);
    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            elem.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // Wait for some time before resetting
            setTimeout(() => {
                elem.textContent = '';
                charIndex = 0;
                type(); // Start typing again
            }, loopDelay);
        }
    }

    type(); // Start the typing effect
}

document.addEventListener("DOMContentLoaded", function () {
    typeLetters('simulate-text', "SIMULATE YOUR CREDIT SCORE!");
});

AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});