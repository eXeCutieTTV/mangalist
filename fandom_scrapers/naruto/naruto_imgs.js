import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/naruto";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://naruto.fandom.com/wiki/Naruto_Uzumaki_(volume)",
    "https://naruto.fandom.com/wiki/The_Worst_Client_(volume)",
    "https://naruto.fandom.com/wiki/For_the_Sake_of_Dreams%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Hero%27s_Bridge!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Challengers!!_(volume)",
    "https://naruto.fandom.com/wiki/Sakura%27s_Decision!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Path_That_Should_Be_Followed%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Life_and_Death_Battles!!_(volume)",
    "https://naruto.fandom.com/wiki/Neji_and_Hinata_(volume)",
    "https://naruto.fandom.com/wiki/A_Splendid_Ninja%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Desiring_Apprenticeship%3F!_(volume)",
    "https://naruto.fandom.com/wiki/The_Great_Flight!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Ch%C5%ABnin_Exams,_Concluded%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Hokage_vs._Hokage!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Naruto_Shinobi_Handbook!!_(volume)",
    "https://naruto.fandom.com/wiki/Konoha_Crush,_Ended!!_(volume)",
    "https://naruto.fandom.com/wiki/Itachi%27s_Power!!_(volume)",
    "https://naruto.fandom.com/wiki/Tsunade%27s_Decision!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Successor_(volume)",
    "https://naruto.fandom.com/wiki/Naruto_vs._Sasuke!!_(volume)",
    "https://naruto.fandom.com/wiki/Unforgivable!!_(volume)",
    "https://naruto.fandom.com/wiki/Reincarnation%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Trouble%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Crisis,_Crisis,_Crisis!!_(volume)",
    "https://naruto.fandom.com/wiki/Itachi_and_Sasuke,_Brothers_(volume)",
    "https://naruto.fandom.com/wiki/The_Day_of_Parting%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Day_of_Departure!!_(volume)",
    "https://naruto.fandom.com/wiki/Naruto%27s_Homecoming!!_(volume)",
    "https://naruto.fandom.com/wiki/Kakashi_vs._Itachi!!_(volume)",
    "https://naruto.fandom.com/wiki/Granny_Chiyo_and_Sakura_(volume)",
    "https://naruto.fandom.com/wiki/Entrusted_Feelings!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Road_to_Sasuke!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Top-Secret_Mission%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Time_of_Reunion%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/The_New_Twosome!!_(volume)",
    "https://naruto.fandom.com/wiki/Team_10_(volume)",
    "https://naruto.fandom.com/wiki/Shikamaru%27s_Battle!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Fruits_of_the_Training%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/The_People_Starting_to_Move_(volume)",
    "https://naruto.fandom.com/wiki/The_Ultimate_Art!!_(volume)",
    "https://naruto.fandom.com/wiki/Jiraiya%27s_Choice!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Secret_of_the_Mangeky%C5%8D%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/The_One_Who_Knows_the_Truth_(volume)",
    "https://naruto.fandom.com/wiki/Handing_Down_Senjutsu%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Battlefield,_Konoha!!_(volume)",
    "https://naruto.fandom.com/wiki/Naruto_Returns!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Seal_Destroyed!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Joyous_Village!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Five_Kage_Summit,_Commences%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Battle_of_the_Death_inside_the_Water_Prison!!_(volume)",
    "https://naruto.fandom.com/wiki/Sasuke_vs._Danz%C5%8D%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Everyone_of_Team_7!!_(volume)",
    "https://naruto.fandom.com/wiki/Naruto%27s_Birth_(volume)",
    "https://naruto.fandom.com/wiki/A_Suspension_Bridge_to_Peace_(volume)",
    "https://naruto.fandom.com/wiki/The_Great_War_Breaks_Out!_(volume)",
    "https://naruto.fandom.com/wiki/Reunited,_Team_Asuma!_(volume)",
    "https://naruto.fandom.com/wiki/Naruto_towards_the_Battlefield%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Naruto_vs._Itachi!!_(volume)",
    "https://naruto.fandom.com/wiki/The_Five_Kage_Gathered%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/Kurama!!_(volume)",
    "https://naruto.fandom.com/wiki/Brothers,_Fight_Together!!_(volume)",
    "https://naruto.fandom.com/wiki/Crack_(volume)",
    "https://naruto.fandom.com/wiki/Dream_World_(volume)",
    "https://naruto.fandom.com/wiki/Ten-Tails_(volume)",
    "https://naruto.fandom.com/wiki/Hashirama_and_Madara_(volume)",
    "https://naruto.fandom.com/wiki/A_New_Three-Way_Deadlock_(volume)",
    "https://naruto.fandom.com/wiki/Breakthrough_(volume)",
    "https://naruto.fandom.com/wiki/Furrow_(volume)",
    "https://naruto.fandom.com/wiki/The_Beginning_of_the_Crimson_Spring_(volume)",
    "https://naruto.fandom.com/wiki/Naruto_and_the_Sage_of_Six_Paths%E2%80%A6!!_(volume)",
    "https://naruto.fandom.com/wiki/I_Love_You_(volume)",
    "https://naruto.fandom.com/wiki/Naruto_Uzumaki!!_(volume)"
]

async function downloadImage(url, filename) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Failed to download ${url}: ${res.status}`);
            return;
        }
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(path.join(folder, filename), Buffer.from(buffer));
        console.log(`Downloaded ${filename}`);
    } catch (err) {
        console.error(`Error downloading ${url}: ${err.message}`);
    }
}

(async () => {
    for (let i = 0; i < volumeLinks.length; i++) {
        const url = volumeLinks[i];
        const filename = `vol_${String(i + 1).padStart(3, "0")}.png`;
        await downloadImage(url, filename);
    }
})();
