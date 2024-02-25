async function getAdvice() {

    const creditScore = document.getElementById("creditScoreSlider").value;
    const creditHistory = document.getElementById("creditHistory").value;
    const missedPayments = document.getElementById("missedPayments").value;
    const creditCards = document.getElementById("creditCards").value;
    const carPayment = document.getElementById("carPayment").value;
    const housePayment = document.getElementById("housePayment").value;
    const outstandingPayments = document.getElementById("outstandingPayments").value;
    const action = document.getElementById("action").value;
    const newCreditScore = document.getElementById("result").innerHTML;
    console.log(newCreditScore)

    const prompts = `A person has a credit score of ${creditScore}, ${creditHistory} years of credit history, 
    ${missedPayments} missed payments, ${creditCards} credit cards, ${carPayment} dollars outstanding on their car
    payment, ${housePayment} dollars oustanding on their house payment, and ${outstandingPayments} dollars
    outstanding on other payments.
    They had to ${action}$. This caused their credit score to change to ${newCreditScore}. 
    Explain why this happened and give them advice in a 3-4 sentence paragraph - refer to the person as "You"`

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
                    content: "Give advice on how to improve credit score."
                }, {
                    role: "user",
                    content: prompts
                }]
            }),
        });
    
        const data = await response.json();
        console.log(data);
    
        const responseText = data.choices && data.choices.length > 0 ? data.choices[0].message.content : "Could not calculate score.";
        console.log(responseText);
    
            // Display the updated score
        document.getElementById("adviceSection").innerHTML = responseText.toString();
        }
