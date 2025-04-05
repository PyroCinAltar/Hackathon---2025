// Player
let player = {
    HP: 35,
    Attack: 4,
    Magic: 4,
    Defense: 4,
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
            Apple: 5,
            ChezBurger: 1
        },
    }
}



// Enemies
let pyroSlime = {
    HP: 35,
    Attack: 4,
    Defense: 5,
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
    Attack: 4,
    Defense: 1,
    Magic: 2,
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
            Type: 'Magic',
        },

    }
}

let rouge = {
    HP: 25,
    Attack: 5,
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
            Dmg: function () { return rouge.Attack },
            Acc: 90,
            Type: 'Physical'
        }
    }
}

let electroMan = {
    HP: 30,
    Attack: 2,
    Defense: 3,
    Magic: 4,
    Weapon: null,
    Attacks: {


        electroManBlast: {
            Dmg: function () { return electroMan.Magic * 3 },
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
    Attack: 1,
    Defense: 0,
    Magic: 6,
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
    Attack: 5,
    Defense: 3,
    Magic: 7,
    Weapon: {
        Name: 'Computer',
        weaponBonus: 1
    },
    attacks: {

        gemiciProgram: {
            Dmg: function () { return gemici.Magic + gemici.Weapon.weaponBonus },
            Acc: 90,
            Type: 'Magic'
        },

        gemiciSecretWifi: {
            Dmg: function () { return gemici.Magic + (gemici.weaponBonus * 3) },
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





function loadFontForGemici() {
    if (enemy === Gemici) {
        document.body.classList.add("underdog-regular");
        console.log("Gemici font applied.");
    } else {
        document.body.classList.remove("underdog-regular");
        console.log("Gemici font removed.");
    }
}

// let enemy = `Gemici`
// loadFontForGemici(Gemici);




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
        damage *= critMultiplier;
        const critMessage = document.createElement("p");
        critMessage.textContent = "Critical hit!";
        dialogueContainer.appendChild(critMessage);
        manageDialogueOverflow();
        critChance = false; // Reset crit chance after use
        accuracyHit = false; // Reset accuracy hit after use
    }
    return damage;
}

healingItems = {
    Apple: {
        heal: 5,
    },
    ChezBurger: {
        heal: 10,
    }
}




// // //Player turn

// Options for the player's turn
const abilityDivs = Array.from(document.querySelectorAll("#CharacterAbilitySelection .Ability"));
console.log(abilityDivs);
// Highlight the initially selected ability
let selectedAbilityIndex = 0;
function handlePlayerTurn(event) {
    if (event.key === "ArrowUp") {
        // Move selection up
        selectedOptionIndex = (selectedOptionIndex - 1 + options.length) % options.length;
        displayOptions();
    } else if (event.key === "ArrowDown") {
        // Move selection down
        selectedOptionIndex = (selectedOptionIndex + 1) % options.length;
        displayOptions();
    } else if (event.key === "Enter") {
        // Confirm selection
        const selectedOption = options[selectedOptionIndex];
        console.log(`You selected: ${selectedOption}`);
    }
}

function enemyTurn() {
    let enemyAttack = enemy.attacks[Object.keys(enemy.attacks)[Math.floor(Math.random() * Object.keys(enemy.attacks).length)]];
    accuracyRoll(enemyAttack);
    if (accuracyHit) {
        let damage = calculateDamage(enemyAttack, player);
        dynamicPlayer -= damage;
        console.log(`Enemy attacks! You take ${damage} damage!`);
    } else {
        console.log("Enemy attack missed!");
    }
}




if (dynamicPlayer <= 0) {
    console.log("Player is defeated");
}

if (dynamicEnemy <= 0) {
    console.log("Enemy is defeated");
    currentEnemyIndex++;
    enemy = enemies[currentEnemyIndex];
    dynamicEnemy = enemies[currentEnemyIndex].HP
    enemyImage = enemiesImage[currentEnemyIndex];
    document.getElementById("img-enemy").src = enemyImage;
}

// CHARACTER HEALTH 
document.querySelector("#main-health").textContent = `Player HP: ${dynamicPlayer}/${player.HP}`;
document.querySelector("#enemy-health").textContent = `Enemy HP: ${dynamicEnemy}/${enemy.HP}`;
// document.head.querySelectorAll('CharacterAbilitySelection').appendChild(style);









