        // Linear Congruential Generator (LCG)
        function lcg(seed) {
            const a = 1664525;
            const c = 1013904223;
            const m = Math.pow(2, 32);
            let state = seed;

            return function() {
                state = (a * state + c) % m;
                return state / m;
            };
        }

        const random = lcg(12345); // Seed value
        console.log(random()); // Generates a random number
        console.log(random()); // Generates another random number