class SlotMachine {
    balance = 1000;

    // get nowBalance() {
    //     return this.balance;
    // }

    reset() {
        this.balance = 1000;
        document.querySelector("#score").innerHTML = this.balance;
    }

    play() {
        this.balance -= 100;
        // const slotArr = ["daulau", "sori", "chuoi", "lucky7"]
        const result = [];
        for (let i = 0; i < 3; i++) {
            let generatedNumber = Math.random();
            if (generatedNumber >= 0 && generatedNumber < 0.3) {
                result.push("daulau");
            } else if (generatedNumber >= 0.3 && generatedNumber < 0.7) {
                result.push("sori");
            } else if (generatedNumber >= 0.7 && generatedNumber < 0.93) {
                result.push("chuoi");
            } else if (generatedNumber >= 0.93 && generatedNumber < 1) {
                result.push("lucky7");
            }
        }
        this.calculateResult(result);
    }

    calculateResult(result) {
        let counts = {}
        for (let i = 0; i < result.length; i++) {
            if (counts[result[i]]) {
                counts[result[i]] += 1
            } else {
                counts[result[i]] = 1
            }
        }

        for (let prop in counts) {
            if (counts[prop] >= 2 && prop == "sori") {
                this.balance += 150
            } else if (counts[prop] == 2 && prop == "chuoi") {
                this.balance += 400
            } else if (counts[prop] == 2 && prop == "lucky7") {
                this.balance += 700
            } else if (counts[prop] == 3 && prop == "lucky7") {
                this.balance += 7000
            } else if (counts[prop] == 2 && prop == "daulau") {
                this.balance -= 200
            } else if (counts[prop] == 3 && prop == "daulau") {
                this.balance /= 2
            }
        }

        document.querySelectorAll('.slot').forEach((slot, index) => {
            const slotResult = result[index];
            const img = slot.querySelector('img');
            img.setAttribute('src', '/assets/svg/' + slotResult + '.svg')
        })

        document.querySelector("#score").innerHTML = this.balance;

        if (this.balance < 100) {
            buttonPlay.disabled = "disabled";
            setTimeout(() => alert("ban da het tien"), 1000)
        }
    }
}

var player1 = new SlotMachine()

const buttonPlay = document.querySelector("#play");
buttonPlay.addEventListener('click', function () {
    player1.play()
})

document.querySelector("#score").innerHTML = 1000;

const buttonReset = document.querySelector("#reset");
buttonReset.addEventListener('click', function () {
    player1.reset()
})