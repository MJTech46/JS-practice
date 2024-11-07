        // Custom Algorithm Using Date
        class MyRandom {
            constructor() {
                this.seed = Date.now().toString().split("").reverse().map(d => parseInt(d));
            }

            generate() {
                const dateIntArr = Date.now().toString().split("").reverse().map(d => parseInt(d));
                this.seed = dateIntArr.map((d, index) => {
                    let newVal = d + this.seed[index];
                    if (newVal > 9) {
                        newVal = newVal % 10;
                    }
                    return newVal;
                });
                this.seed.push(this.seed.shift());
                return this.seed[0];
            }
        }

        const random = new MyRandom();
        console.log(random.generate()); // Generates a random number
        console.log(random.generate()); // Generates another random number

