const express = require("express");
const app = express();

app.listen(() => console.log("Hello"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});

const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = "-"; ///ضع هنا البريفيكس الخاص ببوتك
///Put Here Prefix Of Ur Bot
var status = [`Snow server TOP 1`, ];
const botowner = ["991063235719471174"];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`This Bot Maked By : ERROR`);
  client.user.setStatus("dnd");
  var time = Math.floor(5000);
  setInterval(function() {
    var lengthesof = status.length;
    var amounter = Math.floor(Math.random() * lengthesof);
    client.user.setActivity(status[amounter], { type: "" });
  }, time);
});


client.on("message", message => {
  if (message.content.toLowerCase().startsWith(prefix + "help".toLowerCase())) {
    let help = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`
  > **${client.user.username} Help Cmds\n> Commands : " 6 " \n> Prefix : \`${prefix}\`**\n

      Broadcast Cmds :

      \`${prefix}bc\` , \`${prefix}obc\`, \`${prefix}ping\`
      
      Owners Cmds : 

      \`${prefix}changename\` , \`${prefix}changeavatar\`
      
      `
      )
    message.channel.send(help);
  }
});


client.on("message", message => {
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`Write Something To Send\`
    
    
    
    `);
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .forEach(m => {
        if (m.user.bot) return;
        m.send(`${args}\n ${m}
        `)
     
          .then(() => {
            console.log(`I Send To : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`I Dont Send To : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Send To : \`${message.guild.memberCount}\` `
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`...`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "obc")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
     .setTitle(`${client.user.username}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`\`Write Something To Send\`
    
    
    
    `);
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .filter(m => m.presence.status !== "offline")
      .forEach(m => {
        if (m.user.bot) return;
        m.send(`${args}\n ${m} 
        `)
          .then(() => {
            console.log(`I Send To : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`I Dont Send To : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Send To : \`${
          message.guild.members.cache.filter(
            m => m.presence.status !== "offline"
          ).size
        }\` `
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`...`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("...").then(m => {
      m.edit(
        `\`\`\`javascript\nPing : ${Math.round(
          client.ws.ping
        )} ms\n\`\`\` `
      );
    });
  }
   
});




client.on("message", message => {
  if (message.content.startsWith(prefix + "changename")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!botowner.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
    if (!botnameee)
      return message.channel.send(
        `**Please Write Like This :
        
Ex : \`${prefix}changename ERROR\`
        **`
      );
    client.user.setUsername(`${botnameee}`);
    message.channel.send(`...`).then(me => {
      me.edit(` Done !`);
    });
  }
  if (message.content.startsWith(prefix + "changeavatar")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!botowner.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
    if (!botnameee)
      return message.channel.send(
        `**Please Write Like This :
        
Ex : \`${prefix}changeavatar + **Link** Of Avatar\`
        **`
      );
    client.user.setAvatar(`${botnameee}`);
    message.channel.send(`...`).then(me => {
      me.edit(` Done !`);
    });
  }

});

client.login("");
