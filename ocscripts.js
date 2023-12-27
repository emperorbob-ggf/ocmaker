let ctx, canvas;
let trion, attack, defense, mobility, skill, range, command, tactics;
let mechanical, analysis, parallel;
const TriggerNames = ["opt", "shi", "sco", "egret", "aster", "handgun", "kog", "ray", "viper", "mete", "hound", "speark", "ibis", "light", "escudo", "arifle", "shot", "grenade", "free", "switchbox", "img", "blocked", "soget", "opImg"];
const TriggerImages = {};
for (let i = 0; i < TriggerNames.length; i++) {
    const name = TriggerNames[i];
    if (name === "opImg") {
        TriggerImages[name] = newImage(`./images/${name}.png`, true);
    } else {
        TriggerImages[name] = newImage(`./images/${name}.png`, false);
    }
}

let squadRank = "";
const triggers = ["Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger", "Free Trigger"];
const orderProf = ["POSITION: ", "AGE: ", "BIRTHDAY: ", "HEIGHT: ", "BLOOD TYPE: ", "ZODIAC: ", "OCCUPATION: ", "LIKES: ", "FACTION: "];
const texts = ["", "DEFENSE TRIGGER", "OPTION TRIGGER", "ATTACKER TRIGGER", "ATTACKER TRIGGER", "ATTACKER TRIGGER", "ATTACKER TRIGGER", "SHOOTER TRIGGER", "SHOOTER TRIGGER", "SHOOTER TRIGGER", "SHOOTER TRIGGER", "SNIPER TRIGGER", "SNIPER TRIGGER", "SNIPER TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "DEFENSE TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER", "OPTION TRIGGER"];
texts[54] = "TRAP TRIGGER";
texts[55] = "OPTION TRIGGER";
texts[56] = "OPTION TRIGGER";
texts[57] = "OPTION TRIGGER";
texts[58] = "OPTION TRIGGER";
texts[59] = "ATTACKER TRIGGER";
texts[60] = "OPTION TRIGGER";
const trigNames = ["", "SHIELD", "BAGWORM", "RAYGUST", "KOGETSU", "SCORPION", "KOGETSU: SPEAR", "ASTEROID", "HOUND", "METEORA", "VIPER", "EGRET", "IBIS", "LIGHTNING", "GEN'YO", "LEAD BULLET", "SENKU", "STARMAKER", "THRUSTER", "ESCUDO", "CHAMELEON", "DUMMY BEACON", "GRASSHOPPER", "SILENCER", "SPIDER", "TELEPORTER", "Assault Rifle: Viper", "Assault Rifle: Hound", "Assault Rifle: Asteroid", "Assault Rifle: Meteora", "Assault Rifle: Gimlet", "Assault Rifle: Salamander", "Assault Rifle: Tomahawk", "Grenade Gun: Viper", "Grenade Gun: Hound", "Grenade Gun: Asteroid", "Grenade Gun: Meteora", "Grenade Gun: Gimlet", "Grenade Gun: Salamander", "Grenade Gun: Tomahawk", "Shotgun: Viper", "Shotgun: Hound", "Shotgun: Asteroid", "Shotgun: Meteora", "Shotgun: Gimlet", "Shotgun: Salamander", "Shotgun: Tomahawk", "Handgun: Viper", "Handgun: Hound", "Handgun: Asteroid", "Handgun: Meteora", "Handgun: Gimlet", "Handgun: Salamander", "Handgun: Tomahawk", "SWITCHBOX", "BAGWORM TAG", "IDATEN", "GEIST", "CONNECTOR", "SOUGETSU", "FULL ARMS"];
const trigImg = ["", TriggerImages.shi, TriggerImages.opt, TriggerImages.ray, TriggerImages.kog, TriggerImages.sco, TriggerImages.speark, TriggerImages.aster, TriggerImages.hound, TriggerImages.mete, TriggerImages.viper, TriggerImages.egret, TriggerImages.ibis, TriggerImages.light, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.escudo, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.arifle, TriggerImages.arifle, TriggerImages.arifle, TriggerImages.arifle, TriggerImages.arifle, TriggerImages.arifle, TriggerImages.arifle, TriggerImages.grenade, TriggerImages.grenade, TriggerImages.grenade, TriggerImages.grenade, TriggerImages.grenade, TriggerImages.grenade, TriggerImages.grenade, TriggerImages.shot, TriggerImages.shot, TriggerImages.shot, TriggerImages.shot, TriggerImages.shot, TriggerImages.shot, TriggerImages.shot, TriggerImages.handgun, TriggerImages.handgun, TriggerImages.handgun, TriggerImages.handgun, TriggerImages.handgun, TriggerImages.handgun, TriggerImages.handgun, TriggerImages.switchbox, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.opt, TriggerImages.soget, TriggerImages.opt];
// 0-25 is regular 3-6 Attacker 7-10 Shooter 11-13 Sniper 14-18 Attachments 19-25 Extras 26-32 Assault Rifles 33-39 Grenade Launchers 40-46 Shotguns 47-53 Handguns
let isOperator = false;

function newImage(src, bool) {
    const newimg = new Image();
    if (bool) {
        newimg.onload = () => {
            begin();
        };
    }
    newimg.src = src;
    return newimg;
}

function begin() {
    canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.drawImage(TriggerImages.img, 0, 0, 1280, 590);
    operatorCheck();
    draw();
    reset();
}

function reset() {
    if (isOperator) {
        ctx.drawImage(TriggerImages.opImg, 0, 0, 1280, 590);
    } else {
        ctx.drawImage(TriggerImages.img, 0, 0, 1280, 590);
    }
}

function elementDisplay(str, mode) {
    document.getElementById(str).style.display = mode;
}

function operatorCheck() {
    isOperator = document.getElementById("operatorCheck").checked;
    const combatantElems = ["attackP", "defenseP", "mobilityP", "skillP", "rangeP", "triggers"];
    const opElems = ["mechanicalP", "analysisP", "parallelP"];
    const hidden = "none";
    const block = "block";
    if (isOperator) {
        combatantElems.forEach(str => elementDisplay(str, hidden));
        opElems.forEach(str => elementDisplay(str, block));
    } else {
        combatantElems.forEach(str => elementDisplay(str, block));
        opElems.forEach(str => elementDisplay(str, hidden));
    }
}

function getTrigs() {
    for (let i = 0; i < 4; i++) {
        const e = document.getElementById("main" + (i + 1));
        const ret = e.options[e.selectedIndex].value;
        triggers[i] = parseInt(ret);
    }
    for (let i = 4; i < 8; i++) {
        const e = document.getElementById("sub" + (i - 3));
        const ret = e.options[e.selectedIndex].value;
        triggers[i] = parseInt(ret);
    }
}

function getRank() {
    const e = document.getElementById("squadrank");
    const ret = e.options[e.selectedIndex].value;
    squadRank = ret;
}

/**
 * Assigns values for parameter stats (combatants and operators)
 */
function getParams() {
    trion = Number(document.getElementById("trion").value);
    attack = Number(document.getElementById("attack").value);
    defense = Number(document.getElementById("defense").value);
    mobility = Number(document.getElementById("mobility").value);
    skill = Number(document.getElementById("skill").value);
    range = Number(document.getElementById("range").value);
    command = Number(document.getElementById("command").value);
    tactics = Number(document.getElementById("tactics").value);
    mechanical = Number(document.getElementById("mechanical").value);
    analysis = Number(document.getElementById("analysis").value);
    parallel = Number(document.getElementById("parallel").value);
}

/**
 * @param {Number} tr Number value to be parsed
 * @returns {Array} Coordinates for Trion [tx, ty]
 */
function getTrion(tr) {
    const tx = 812;
    const ty = 373 + (-13.25 * (tr - 1));
    return [tx, ty];
}

function getAttack(ar) {
    const ax = 821 + (9.25 * (ar - 1));
    const ay = 376 + (-9.25 * (ar - 1));
    return [ax, ay];
}

function getDefense(dr) {
    const dx = 825 + (13.25 * (dr - 1));
    const dy = 386;
    return [dx, dy];
}

function getMobility(mr) {
    const mx = 821 + (9.55 * (mr - 1));
    const my = 395 + (9.55 * (mr - 1));
    return [mx, my];
}

function getSkill(sr) {
    const sx = 812;
    const sy = 399 + (13.25 * (sr - 1));
    return [sx, sy];
}

function getRange(rr) {
    const rx = 802 + (-9.5 * (rr - 1));
    const ry = 395 + (9.5 * (rr - 1));
    return [rx, ry];
}

function getCommand(cr) {
    const cx = 800 + (-13.25 * (cr - 1));
    const cy = 386;
    return [cx, cy];
}

function getTactics(tr) {
    const ttx = 803 + (-9.4 * (tr - 1));
    const tty = 375 + (-9.15 * (tr - 1));
    return [ttx, tty];
}

function getOpTrion(tr) {
    const tx = 812;
    let ty = 384 + (-10.5 * tr);
    if (tr > 2) {
        ty = 384 + (-12 * tr);
    }
    return [tx, ty];
}

function getMechanical(mr) {
    let mx = 814 + (10 * mr);
    let my = 385 + (-6 * mr);
    if (mr > 2) {
        mx = 814 + (10.5 * mr);
    }
    return [mx, my];
}

function getData(dr) {
    let dx = 814 + (10 * dr);
    let dy = 386 + (6.25 * dr);
    if (dr > 2) {
        dx = 814 + (10.5 * dr);
    }
    return [dx, dy];
}

function getParallel(pr) {
    const px = 812;
    let py = 388 + (11 * pr);
    if (pr > 2) {
        py = 388 + (12.25 * pr);
    }
    return [px, py];
}

function getOpTactics(tr) {
    let ttx = 811 + (-10 * tr);
    const tty = 386 + (6.25 * tr);
    if (tr > 2) {
        ttx = 811 + (-10.5 * tr);
    }
    return [ttx, tty];
}

function getOpCommand(cr) {
    let cx = 811 + (-10 * cr);
    const cy = 385 + (-6 * cr);
    if (cr > 2) {
        cx = 811 + (-10.5 * cr);
    }
    return [cx, cy];
}

/**
 * Draw text for individual stats and total on the radar chart
 */
function drawStats() {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if (isOperator) {
        ctx.font = "normal normal bold 15px Arial";
        ctx.fillText(trion, 812, 257);
        ctx.fillText(mechanical, 935, 315);
        ctx.fillText(analysis, 935, 480);
        ctx.fillText(parallel, 812, 542);
        ctx.fillText(tactics, 695, 480);
        ctx.fillText(command, 685, 320);
    } else {
        ctx.font = "normal normal bold 13px Arial";
        ctx.fillText(trion, 812, 253);
        ctx.fillText(attack, 925, 299);
        ctx.fillText(defense, 963, 404);
        ctx.fillText(mobility, 928, 503);
        ctx.fillText(skill, 812, 543);
        ctx.fillText(range, 707, 505);
        ctx.fillText(command, 663, 405);
        ctx.fillText(tactics, 701, 304);
    }
    ctx.font = "normal normal bold 26px Arial";
    const fontSmaller = "normal normal bold 20px Arial";
    ctx.textAlign = "start";
    let sum;
    let cx, cy;
    if (isOperator) {
        sum = mechanical + analysis + parallel + tactics + command;
        cx = 722;
        cy = 552;
    } else {
        sum = trion + attack + defense + mobility + skill + range + command + tactics;
        cx = 719;
        cy = 554;
    }
    if (sum % 1 !== 0) {
        ctx.font = fontSmaller;
    }
    ctx.fillText(sum, cx, cy);
}

let textY, imgY, nameY, freeY;
function drawGuns(xVal, xVal2, xVal3, z) {
    ctx.fillText("GUNNER TRIGGER", xVal, textY);
    ctx.drawImage(trigImg[triggers[z]], xVal2, imgY, 39, 43);
    ctx.font = "normal normal bold 11.5px Arial";
    ctx.fillText(trigNames[triggers[z]], xVal3, nameY);
}

function trigText() {
    if (isOperator) {
        return;
    }
    ctx.fillStyle = "black";
    textY = 264;
    imgY = 260;
    nameY = 290;
    freeY = 251;
    for (let i = 0; i < 4; i++) {
        ctx.font = "normal normal bold 10px Arial";
        if (triggers[i] === 0) {
            ctx.drawImage(TriggerImages.free, 361, freeY);
        } else if (triggers[i] > 25 && triggers[i] <= 53) {
            drawGuns(418, 372, 420, i);
        } else if (triggers[i] === 55) {
            ctx.fillText(texts[triggers[i]], 418, textY);
            ctx.drawImage(TriggerImages.opt, 372, imgY, 39, 43);
            ctx.font = "normal normal bold 13px Arial";
            ctx.fillText(trigNames[triggers[i]], 423, nameY);
            freeY += 71;
            ctx.drawImage(TriggerImages.blocked, 361, freeY);
            freeY += 71;
            ctx.drawImage(TriggerImages.blocked, 361, freeY);
            freeY += 71;
            ctx.drawImage(TriggerImages.blocked, 361, freeY);
            break;
        } else {
            ctx.fillText(texts[triggers[i]], 418, textY);
            ctx.drawImage(trigImg[triggers[i]], 372, imgY, 39, 43);
            ctx.font = "normal normal bold 13px Arial";
            const lines = getLines(trigNames[triggers[i]], 122);
            let add = 0;
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 423, nameY + add);
                add += 12;
            }
        }
        textY += 71;
        imgY += 71;
        nameY += 71;
        freeY += 71;
    }
    textY = 209;
    imgY = 205;
    nameY = 235;
    freeY = 196;
    for (let i = 4; i < 8; i++) {
        ctx.font = "normal normal bold 10px Arial";
        if (triggers[i] === 0) {
            ctx.drawImage(TriggerImages.free, 1049, freeY);
        } else if (triggers[i] > 25 && triggers[i] <= 53) {
            drawGuns(1106, 1060, 1108, i);
        } else {
            ctx.fillText(texts[triggers[i]], 1106, textY);
            ctx.drawImage(trigImg[triggers[i]], 1060, imgY, 39, 43);
            ctx.font = "normal normal bold 13px Arial";
            const lines = getLines(trigNames[triggers[i]], 122);
            let add = 0;
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 1111, nameY + add);
                add += 12;
            }
        }
        textY += 71;
        imgY += 71;
        nameY += 71;
        freeY += 71;
    }
}

function writeName() {
    const charName = document.getElementById("name").value;
    ctx.fillStyle = "white";
    ctx.font = "normal normal normal 59.6px crusader";
    ctx.fillText(charName, 340, 89, 629);
    ctx.fillStyle = "black";
}

/**
 * Writes the rank number.
 * Smaller text for B-Rank (3 digits)
 */
function writeRank() {
    const rank = document.getElementById("ranking").value;
    ctx.fillStyle = "white";
    ctx.font = "normal normal normal 38px stencil";
    ctx.textAlign = "center";
    if (squadRank === "A") {
        ctx.fillText(rank, 128, 63);
    } else {
        ctx.font = "normal normal normal 32px stencil";
        ctx.fillText(rank, 128, 63, 55);
    }
    ctx.textAlign = "start";
    ctx.fillStyle = "black";
}

let emblemUrl;
let emblem;
function drawSquadEmblem() {
    emblemUrl = document.getElementById("emblem").value;
    emblem = new Image();
    emblem.src = emblemUrl;
    emblem.onload = () => {
        ctx.drawImage(emblem, 30, 73, 133, 121);
    };
}

function getProfile() {
    const position = document.getElementById("position").value.toUpperCase();
    const age = document.getElementById("age").value.toUpperCase();
    const birthday = document.getElementById("birthday").value.toUpperCase();
    const height = document.getElementById("height").value.toUpperCase();
    const bloodtype = document.getElementById("blood-type").value.toUpperCase();
    const zodiac = document.getElementById("zodiac").value.toUpperCase();
    const occupation = document.getElementById("occupation").value.toUpperCase();
    const likes = document.getElementById("likes").value.toUpperCase();
    const faction = document.getElementById("faction").value.toUpperCase();
    return [position, age, birthday, height, bloodtype, zodiac, occupation, likes, faction];
}

function drawProfile() {
    let outY = 275;
    ctx.font = "normal normal normal 12px arial";
    const orderProf2 = getProfile();
    for (let i = 0; i <= 6; i++) {
        ctx.fillText(orderProf[i] + orderProf2[i], 25, outY);
        outY += 12;
    }
    const likes = orderProf2[7]; // Index for Likes
    const lines = getLines(likes, 230);
    for (let i = 0; i < lines.length; i++) {
        if (i === 0) {
            ctx.fillText("LIKES: " + lines[i], 25, outY);
        } else {
            ctx.fillText(lines[i], 25, outY);
        }
        outY += 12;
    }
    ctx.fillText("FACTION: " + orderProf2[8], 25, outY);
}

function getLines(text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

/**
 * Does the A or B rank text in the emblem
 */
function drawRank() {
    ctx.font = "normal normal normal 37px stencil";
    ctx.fillStyle = "black";
    ctx.fillText(squadRank, 50, 63);
}

function clipStats() {
    ctx.save();
    ctx.beginPath();
    if (isOperator) {
        ctx.moveTo(812, 265); // Tri
        ctx.lineTo(917, 325); // Operation
        ctx.lineTo(918, 446); // Data
        ctx.lineTo(812, 508); // Parallel
        ctx.lineTo(707, 448); // Tactics
        ctx.lineTo(706, 325); // Command
        ctx.lineTo(812, 265); // Tri
    } else {
        ctx.moveTo(812, 255); // Tri
        ctx.lineTo(905, 291); // Atk
        ctx.lineTo(944, 385); // Def
        ctx.lineTo(905, 479); // Mob
        ctx.lineTo(812, 518); // Skill
        ctx.lineTo(718, 479); // Range
        ctx.lineTo(680, 386); // Command
        ctx.lineTo(719, 293); // Special
        ctx.lineTo(812, 255); // Tri
    }
    ctx.clip();
}

function draw() {
    reset();
    writeName();
    drawSquadEmblem();
    getTrigs();
    getParams();
    trigText();
    drawStats();

    getRank();
    drawRank();
    writeRank();
    drawProfile();
    // Combatants
    let tx, ty, ax, ay, dx, dy, mx, my, sx, sy, rx, ry, cx, cy, ttx, tty;
    //Operators
    let mox, moy, dax, day, ppx, ppy;

    if (isOperator) {
        [tx, ty] = getOpTrion(trion);
        [mox, moy] = getMechanical(mechanical);
        [dax, day] = getData(analysis);
        [ppx, ppy] = getParallel(parallel);
        [ttx, tty] = getOpTactics(tactics);
        [cx, cy] = getOpCommand(command);
    } else {
        [tx, ty] = getTrion(trion);
        [ax, ay] = getAttack(attack);
        [dx, dy] = getDefense(defense);
        [mx, my] = getMobility(mobility);
        [sx, sy] = getSkill(skill);
        [rx, ry] = getRange(range);
        [cx, cy] = getCommand(command);
        [ttx, tty] = getTactics(tactics);
    }
    clipStats();

    ctx.beginPath();
    ctx.globalAlpha = 0.45;
    ctx.moveTo(tx, ty);
    if (isOperator) {
        ctx.lineTo(mox, moy);
        ctx.lineTo(dax, day);
        ctx.lineTo(ppx, ppy);
        ctx.lineTo(ttx, tty);
        ctx.lineTo(cx, cy);
    } else {
        ctx.lineTo(ax, ay);
        ctx.lineTo(dx, dy);
        ctx.lineTo(mx, my);
        ctx.lineTo(sx, sy);
        ctx.lineTo(rx, ry);
        ctx.lineTo(cx, cy);
        ctx.lineTo(ttx, tty);
    }
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
}

function addTrigger() {
    let e = document.getElementById("customImg");
    let ret = parseInt(e.options[e.selectedIndex].value);
    const imageUrl = TriggerImages[TriggerNames[ret]];
    const triggerName = document.getElementById("customTriggerName").value.toUpperCase();
    e = document.getElementById("customTriggerType");
    ret = e.options[e.selectedIndex].value;
    const triggerType = ret;
    texts.push(triggerType);
    trigNames.push(triggerName);
    trigImg.push(imageUrl);
    for (let i = 1; i <= 4; i++) {
        document.getElementById("main" + i).innerHTML += `<option value="${trigNames.length - 1}">${triggerName}</option>`;
    }
    for (let i = 1; i <= 4; i++) {
        document.getElementById("sub" + i).innerHTML += `<option value="${trigNames.length - 1}">${triggerName}</option>`;
    }
}

function saveImage() {
    var link = document.createElement('a');
    link.download = 'ocmaker.png';
    link.href = canvas.toDataURL()
    link.click();
}