        // Middle Square Method
        function middleSquare(seed) {
            let state = seed;

            return function() {
                state = (state * state).toString().padStart(8, '0').slice(2, 6);
                return parseInt(state) / 10000;
            };
        }

        const random = middleSquare(1234); // Seed value
        console.log(random()); // Generates a random number
        console.log(random()); // Generates another random number