//Player
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
            Dmg: function() {player.Attack + player.Weapon.weaponBonus,
            Acc: 90,
            Type: 'Physical'
        },
        
        playerStrongAttack: {
            Dmg: player.Attack + (player.Weapon.weaponBonus * 2),
            Acc: 60,
            Type: 'Physical'
        },
        
        playerWindBlade: {
            Dmg: player.Magic + player.Weapon.weaponBonus,
            Acc: 85,
            Type: 'Magic'
        },





        Items: {
            Apple: 5,
            ChezBurger: 1
        },
        Act: {
            act1: 'dmgBuff',
            act2: 'ElementalResist'
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
            Dmg: pyroSlime.Attack,
            Acc: 90,
            Type: 'Physical'
        },

        pyroSlimeSinge: {
            Dmg: pyroSlime.Magic,
            Acc: 90,
            Type: 'Magic',
            burnChance: 10
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
            Dmg: spider.Attack,
            Acc: 95,
            Type: 'Physical'
        },

        spiderVenomBite: {
            Dmg: spider.Attack,
            Acc: 90,
            Type: 'Magic',
            poisonChance: 10
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
            Dmg: rouge.Attack,
            Acc: 95,
            Type: 'Physical'
        },

        rougeStab: {
            Dmg: rouge.Attack,
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
            Dmg: electroMan.Magic * 3,
            Acc: 70,
            Type: 'Magic'
        },

        electroManThunderbolt: {
            Dmg: electroMan.Magic,
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
            Dmg: hydroElemental.Magic + hydroElemental.Attack,
            Acc: 85,
            Type: 'Magic'
        },

        hydroElementalHydroBullet: {
            Dmg: hydroElemental.Magic,
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
            Dmg: gemici.Magic + gemici.Weapon.weaponBonus,
            Acc: 90,
            Type: 'Magic'
        },

        gemiciSecretWifi: {
            Dmg: gemici.Magic + (gemici.weaponBonus * 3),
            Acc: 90,
            Type: 'Magic'
        }
    }
}








//Turn Order

// Damage Calculation
let critChance = false
let critMultiplier = 1.5
let burnChance = false
let poisonChance = false
let dmgBuff = false
let dmgBuffMultiplier = 1.2
let elementalResist = false
let elementalResistMultiplier = 0.75

function critRoll() {
    let roll = Math.floor(Math.random() * 24) + 1;
    if (roll === 24) {
        critChance = true;
    }
}

function dmgBuffRoll() {
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

let dmgBuffStatus = {
    duration: 3,
    effect: function (target) {
        dmgBuff = true;
        this.duration--;
        if (Math.floor(this.duration) >= 0) {
            console.log("Damage buff has ended.");
        }
    }
}

let elementalResistStatus = {
    duration: 3,
    effect: function (target) {
        elementalResist = true;
        this.duration--;
        if (Math.floor(this.duration) >= 0) {
            console.log("Elemental resist has ended.");
        }
    }
}



function burnRoll() {
    let roll = Math.floor(Math.random() * 100) + 1;
    if (roll <= 10) {
        burnChance = true;
    }
}
function poisonRoll() {
    let roll = Math.floor(Math.random() * 100) + 1;
    if (roll <= 10) {
        poisonChance = true;
    }
}

// Player Status Effects
let burnStatus = {
    damagePerTurn: 2,
    duration: 3,
    effect: function (target) {
        target.HP -= this.damagePerTurn;
        this.duration--;
        if (this.duration <= 0) {
            console.log("Burn effect has ended.");
        }
    }
}

let poisonStatus = {
    damagePerTurn: 2,
    duration: 3,
    effect: function (target) {
        target.HP -= this.damagePerTurn;
        this.duration--;
        if (this.duration <= 0) {
            console.log("Poison effect has ended.");
        }
    }
}


// Healing Items
