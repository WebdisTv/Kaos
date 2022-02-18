const Discord = require("discord.js");
const Canvas = require("canvas")

const Client = new Discord.Client({
    intents:[
Discord.Intents.FLAGS.GUILDS,
Discord.Intents.FLAGS.GUILD_MEMBERS,
Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
Discord.Intents.FLAGS.GUILD_PRESENCES,
Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const prefix ="!k ";

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.on("guildMemberAdd", async member => {
    console.log("Un membre est arrivé!");
    Client.channels.cache.get("943880046542729279").send("<@" + member.id + "> est arrivé!");

    var canvas = Canvas.createCanvas(1280, 720);

    ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./background png.png");
    ctx.drawImage(background, 0, 0, 1280, 720);

    ctx.font = "82px Impact";
    ctx.fillStyle = "#d6d2d6";
    ctx.textAlign = "center";
    ctx.fillText(member.user.tag.toUpperCase(), 640, 630);

    ctx.beginPath();
    ctx.arc(534, 372, 338, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: "png",
        size: 1024
    }));

    ctx.drawImage(avatar, 520, 210, 250, 250)


    var attachement = new Discord.MessageAttachment(canvas.toBuffer(), "Background png.png");

    Client.channels.cache.get("943880046542729279").send({files: [attachement]});

});

Client.on("guildMemberRemove", member => {
    console.log("Un membre a quitté le serveur.");
    Client.channels.cache.get("943880046542729279").send(member.displayName + " a quitté le serveur"); 
});

//say
Client.on("messageCreate", message => {
    if(message.author !="943878803992743936"){
        if(message.content.includes(prefix + "say")){
            message.channel.send({content: `${message.content.substring(message.content.indexOf('y')+2)}`, tts: true})
            message.delete()
        }
        
        if(message.author.bot){
            return;
        }
    
        //mp
        if(message.content.includes (prefix + "mp")){
            if(message.mentions.users.size > 0){
                if(message.content.indexOf('@')!==-1){
                    if(message.content.indexOf('@&')<=1){
                        Client.users.cache.get(message.mentions.members.first().id).send(`${message.content.substring(message.content.indexOf('p')+2)}`)
                        Client.users.cache.get('266999083670044676').send(`${message.author.username} a envoyé un message à ${message.mentions.members.first().id} à ${Date().substring(0,25)} Le message disait: ${message.content}`)
                        message.delete()
                    }
                }
            }
        }
            

        //help
        if(message.content === prefix + "help"){
            const embed = new Discord.MessageEmbed()
            .setColor("#66110D")
            .setTitle("Commandes de Kaos")
            .addField("__!k help__", "Affiche la liste des commandes")
            .addField("__!k say__", "Supprime la demande et écris le message en TTS")
            .addField("__!k mp__", "Envoie un message privé à la personne choisis");

            message.channel.send({ embeds: [embed]});
        }
    }
})

Client.login("OTQzODc4ODAzOTkyNzQzOTM2.Yg5dow.FCBkAeF5A-h04BcSvB3n7MVO5oA");