// Player
let player = {
    HP: 35,
    Attack: 4,
    Magic: 4,
    Defense: 2,
    Weapon: {
        Name: 'Sword',
        weaponBonus: 3
    },
    Attacks: {
        playerBasicAttack: {
            Dmg: function () { return player.Attack + player.Weapon.weaponBonus },
            Acc: 90,
            Type: 'Physical'
        },

        playerStrongAttack: {
            Dmg: function () { return player.Attack + (player.Weapon.weaponBonus * 2) },
            Acc: 60,
            Type: 'Physical'
        },

        playerWindBlade: {
            Dmg: function () { return player.Magic + player.Weapon.weaponBonus },
            Acc: 85,
            Type: 'Magic'
        },


        Items: {
            Apple: 7,
            ChezBurger: 2
        },
    }
}



// Enemies
let pyroSlime = {
    HP: 35,
    Attack: 3,
    Defense: 3,
    Magic: 4,
    Weapon: null,
    attacks: {
        pyroSlimePound: {
            Dmg: function () { return pyroSlime.Attack },
            Acc: 90,
            Type: 'Physical'
        },

        pyroSlimeSinge: {
            Dmg: function () { return pyroSlime.Magic },
            Acc: 90,
            Type: 'Magic',
        },
    }
}

let spider = {
    HP: 30,
    Attack: 2,
    Defense: 2,
    Magic: 0,
    Weapon: null,
    attacks: {

        spiderCrawl: {
            Dmg: function () { return spider.Attack },
            Acc: 95,
            Type: 'Physical'
        },

        spiderVenomBite: {
            Dmg: function () { return spider.Attack },
            Acc: 90,
            Type: 'Physical',
        },

    }
}

let rouge = {
    HP: 25,
    Attack: 3,
    Defense: 2,
    Magic: 0,
    Weapon: {
        Name: 'Dagger',
        weaponBonus: 2
    },
    attacks: {

        rougeKick: {
            Dmg: function () { return rouge.Attack },
            Acc: 95,
            Type: 'Physical'
        },

        rougeStab: {
            Dmg: function () { return rouge.Attack + 1 },
            Acc: 90,
            Type: 'Physical'
        }
    }
}

let electroMan = {
    HP: 35,
    Attack: 2,
    Defense: 4,
    Magic: 4,
    Weapon: null,
    attacks: {


        electroManBlast: {
            Dmg: function () { return electroMan.Magic * 2 },
            Acc: 70,
            Type: 'Magic'
        },

        electroManThunderbolt: {
            Dmg: function () { return electroMan.Magic },
            Acc: 90,
            Type: 'Magic'
        }
    }
}

let hydroElemental = {
    HP: 40,
    Attack: 3,
    Defense: 2,
    Magic: 4,
    Weapon: null,
    attacks: {
        hydroElementalAquaCutter: {
            Dmg: function () { return hydroElemental.Magic + hydroElemental.Attack },
            Acc: 85,
            Type: 'Magic'
        },

        hydroElementalHydroBullet: {
            Dmg: function () { return hydroElemental.Magic },
            Acc: 90,
            Type: 'Magic'
        },
    }
}

const Gemici = {
    HP: 60,
    Attack: 4,
    Defense: 2,
    Magic: 6,
    Weapon: {
        Name: 'Computer',
        weaponBonus: 1
    },
    attacks: {

        gemiciProgram: {
            Dmg: function () { return Gemici.Magic + Gemici.Weapon.weaponBonus },
            Acc: 90,
            Type: 'Magic'
        },

        gemiciSecretWifi: {
            Dmg: function () { return Gemici.Magic + (Gemici.weaponBonus * 3) },
            Acc: 90,
            Type: 'Magic'
        }
    }
}


//Dialouge
const dialogueContainer = document.getElementById("Character-Dialogue");

function manageDialogueOverflow() {
    const paragraphs = dialogueContainer.querySelectorAll("p");
    if (paragraphs.length > 5) {
        dialogueContainer.removeChild(paragraphs[0]); // Remove the oldest paragraph
    }
}




//Cycling and Fonts
let enemies = [pyroSlime, spider, rouge, electroMan, hydroElemental, Gemici];
let enemiesImage = ['Sprites/Pyro_Slime.png', 'Sprites/Spider.png', 'Sprites/Rouge.png', 'Sprites/ElecStick.png', 'Sprites/HydroEle.png', 'Sprites/MrGemici.png'];
let currentEnemyIndex = 0;
let enemy = enemies[currentEnemyIndex];
let enemyImage = enemiesImage[currentEnemyIndex];


// Dynamic HP
let dynamicPlayer = player.HP
let dynamicEnemy = enemies[currentEnemyIndex].HP



loadFontForGemici()


function loadFontForGemici() {
    // Check if the current enemy is Gemici based on a unique property
    if (enemy.Weapon && enemy.Weapon.Name === "Computer") {
        document.body.classList.add("underdog-regular");
        document.body.style.fontFamily = "'Underdog', sans-serif";
        console.log("Gemici font applied.");
    } else {
        document.body.classList.remove("underdog-regular");
        console.log("Gemici font removed.");
    }
}




// Damage Calculation
critChance = false
let critMultiplier = 1.5

function critRoll() {
    let roll = Math.floor(Math.random() * 24) + 1;
    if (roll === 24) {
        critChance = true;
    }
}



// accuracy 
let accuracyHit = false

function accuracyRoll(attack) {
    let roll = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    if (roll <= attack.Acc) {
        accuracyHit = true;
    }
}



//Dmamage Calculation
function calculateDamage(attack, target) {
    let damage = attack.Dmg() - target.Defense;
    critRoll()

    if (critChance) {
        damage *= critMultiplier
        Math.floor(damage);
        const critMessage = document.createElement("p");
        critMessage.textContent = "Critical hit!";
        dialogueContainer.appendChild(critMessage);
        manageDialogueOverflow();
        critChance = false; // Reset crit chance after use
        accuracyHit = false; // Reset accuracy hit after use
    }
    return damage;
}

let appleCount = player.Attacks.Items.Apple;
let burgerCount = player.Attacks.Items.ChezBurger;
let appleHeal = 10;
let burgerHeal = 35;

let playerTurnPass = false





// // //Player turn

// Options for the player's turn
const abilityDivs = Array.from(document.querySelectorAll("#CharacterAbilitySelection .Ability"));
console.log(abilityDivs);
// Highlight the initially selected ability
let selectedAbilityIndex = 0;

// Function to update the styling of abilities based on selection
function updateAbilityStyles() {
    abilityDivs.forEach((ability, index) => {
        if (index === selectedAbilityIndex) {
            ability.classList.add("selected");
        } else {
            ability.classList.remove("selected");
        }
    });
}

// Add event listener for player turn navigation
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        // Move selection up
        selectedAbilityIndex = (selectedAbilityIndex - 1 + abilityDivs.length) % abilityDivs.length;
        updateAbilityStyles();
    } else if (event.key === "ArrowDown") {
        // Move selection down
        selectedAbilityIndex = (selectedAbilityIndex + 1) % abilityDivs.length;
        updateAbilityStyles();
    } else if (event.key === "Enter") {
        // Confirm selection
        const selectedAbility = abilityDivs[selectedAbilityIndex];
        if (selectedAbility.textContent === "Basic Attack" || selectedAbility.textContent === "Strong Attack" || selectedAbility.textContent === "Wind Blade") {
            const attack = player.Attacks[`player${selectedAbility.textContent.replace(" ", "")}`];
            accuracyRoll(attack);
            if (accuracyHit) {
                const damage = calculateDamage(attack, enemy);
                dynamicEnemy -= damage;
                const attackMessage = document.createElement("p");
                attackMessage.textContent = `You used ${selectedAbility.textContent}, dealing ${damage} damage!`;
                dialogueContainer.appendChild(attackMessage);
                manageDialogueOverflow();
            } else {
                const missMessage = document.createElement("p");
                missMessage.textContent = `${selectedAbility.textContent} missed!`;
                dialogueContainer.appendChild(missMessage);
                manageDialogueOverflow();
            }
            document.querySelector("#enemy-health").textContent = `Enemy HP: ${dynamicEnemy}/${enemies[currentEnemyIndex].HP}`;

            if (dynamicEnemy <= 0) {
                const defeatMessage = document.createElement("p");
                defeatMessage.textContent = "Enemy is defeated";
                dialogueContainer.appendChild(defeatMessage);
                manageDialogueOverflow();

                currentEnemyIndex++;
                if (currentEnemyIndex < enemies.length) {
                    enemy = enemies[currentEnemyIndex];
                    dynamicEnemy = enemies[currentEnemyIndex].HP;
                    enemyImage = enemiesImage[currentEnemyIndex];
                    document.getElementById("img-enemy").src = enemyImage;

                    // Reapply font logic for the new enemy
                    loadFontForGemici();
                } else {
                    const victoryMessage = document.createElement("p");
                    victoryMessage.textContent = "Congratulations! You have defeated all enemies!";
                    dialogueContainer.appendChild(victoryMessage);
                    manageDialogueOverflow();
                    document.removeEventListener("keydown", event); // Disable further player input
                    return;
                }
            }
        } else if (selectedAbility.textContent === 'Apple' || selectedAbility.textContent === "Chez Burger") {
            if (selectedAbility.textContent === "Apple" && appleCount > 0) {
                dynamicPlayer = Math.min(player.HP, dynamicPlayer + appleHeal); // Ensure HP does not exceed max
                appleCount--;
                const healMessage = document.createElement("p");
                healMessage.textContent = "You used an Apple and restored HP!";
                dialogueContainer.appendChild(healMessage);

                manageDialogueOverflow();
            } else if (selectedAbility.textContent === "Chez Burger" && burgerCount > 0) {
                dynamicPlayer = Math.min(player.HP, dynamicPlayer + burgerHeal); // Ensure HP does not exceed max
                burgerCount--;
                const healMessage = document.createElement("p");
                healMessage.textContent = "You used a Chez Burger and restored HP!";
                dialogueContainer.appendChild(healMessage);

                manageDialogueOverflow();
            } else {
                const noItemMessage = document.createElement("p");
                noItemMessage.textContent = "You don't have enough of that item!";
                dialogueContainer.appendChild(noItemMessage);
                manageDialogueOverflow();
            }
            document.querySelector("#main-health").textContent = `Player HP: ${dynamicPlayer}/${player.HP}`;
        }
        critChance = false; // Reset crit chance after use
        accuracyHit = false; // Reset accuracy hit after use
        playerTurnPass = true; // Set player turn to pass
        if (playerTurnPass) {
            enemyTurn();
            playerTurnPass = false; // Reset player turn pass
        }
    }
}
)

// Initialize the ability styles
updateAbilityStyles();

function enemyTurn() {
    // Ensure the enemy and its attacks are defined
    if (!enemy || !enemy.attacks) {
        console.error("Enemy or enemy attacks are undefined.");
        return; // Exit the function to prevent further errors
    }

    // Select a random attack from the enemy's attacks
    let attackKeys = Object.keys(enemy.attacks); // Get all attack keys
    let randomIndex = Math.floor(Math.random() * attackKeys.length); // Pick a random index
    let enemyAttack = enemy.attacks[attackKeys[randomIndex]]; // Get the attack object

    // Pass the correct attack to accuracyRoll
    accuracyRoll(enemyAttack);

    if (accuracyHit) {
        let damage = calculateDamage(enemyAttack, player);
        dynamicPlayer -= damage;
        document.querySelector("#main-health").textContent = `Player HP: ${dynamicPlayer}/${player.HP}`;
        console.log(`Enemy attacks! You take ${damage} damage!`);
        const enemyAttackMessage = document.createElement("p");
        enemyAttackMessage.textContent = `Enemy attacks! You take ${damage} damage!`;
        dialogueContainer.appendChild(enemyAttackMessage);
        manageDialogueOverflow();
    } else {
        console.log("Enemy attack missed!");
        const missMessage = document.createElement("p");
        missMessage.textContent = "Enemy attack missed!";
        dialogueContainer.appendChild(missMessage);
        manageDialogueOverflow();
    }

    if (dynamicPlayer <= 0) {
        const defeatMessage = document.createElement("p");
        defeatMessage.textContent = "You have been defeated. Game Over!";
        dialogueContainer.appendChild(defeatMessage);
        manageDialogueOverflow();
        document.removeEventListener("keydown", event); // Disable further player input   }
    }
}

if (dynamicEnemy <= 0 && enemy === Gemici) {
    if (dynamicEnemy <= 0) {
        const defeatMessage = document.createElement("p");
        defeatMessage.textContent = "Enemy is defeated";
        dialogueContainer.appendChild(defeatMessage);
        manageDialogueOverflow();

        // Check if the defeated enemy is Gemici
        if (enemy === Gemici) {
            const victoryMessage = document.createElement("p");
            victoryMessage.textContent = "Congratulations! You have defeated Gemici and won the game!";
            dialogueContainer.appendChild(victoryMessage);
            manageDialogueOverflow();
            document.removeEventListener("keydown", event); // Disable further player input
        }

        // Move to the next enemy
        currentEnemyIndex++;
        enemy = enemies[currentEnemyIndex];
        dynamicEnemy = enemies[currentEnemyIndex].HP;
        enemyImage = enemiesImage[currentEnemyIndex];
        document.getElementById("img-enemy").src = enemyImage;
    }
}


// CHARACTER HEALTH 
document.querySelector("#main-health").textContent = `Player HP: ${dynamicPlayer}/${player.HP}`;
document.querySelector("#enemy-health").textContent = `Enemy HP: ${dynamicEnemy}/${enemies[currentEnemyIndex].HP}`;
// document.head.querySelectorAll('CharacterAbilitySelection').appendChild(style);

//Game over Screen
if (dynamicPlayer <= 0) {
    window.location.href = "/Layout/Game Ove/index.html";
}