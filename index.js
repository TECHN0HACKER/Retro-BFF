const DISCORDJS = require('discord.js')
const fs = require('fs')
require('dotenv/config')
const { Client, Intents } = require('discord.js');
    
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = ';';
var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();

try {
client.on('ready', () => {
    console.log('ok')
    client.user?.setActivity("Quadratic Equations", { type: "PLAYING"})
    const server = '942740307542421544'
    const guild = client.guilds.cache.get(server)
    let cmds

    if (guild) {
        cmds = guild.commands
    } else {
        cmds = client.application?.commands
    }

    cmds?.create({
        name: '8ball',
        description: 'Guess about something',
        options: [{
            name: 'question',
            description: 'What you want to ask',
            required: true,
            type: DISCORDJS.Constants.ApplicationCommandOptionTypes.STRING
        }],
    })

    cmds?.create({
        name: 'probability',
        description: 'Find the probability of something',
        options: [{
            name: 'question',
            description: 'What you want to ask',
            required: true,
            type: DISCORDJS.Constants.ApplicationCommandOptionTypes.STRING
        }],
    })

    cmds?.create({
        name: 'dictionary',
        description: 'Add a word to the dictionary',
        options: [{
            name: 'word',
            description: 'What you want to add',
            required: true,
            type: DISCORDJS.Constants.ApplicationCommandOptionTypes.STRING},
            {
            name: 'definition',
            description: 'What it means',
            required: true,
            type: DISCORDJS.Constants.ApplicationCommandOptionTypes.STRING           
        }],
    })

    cmds?.create({
        name: 'help',
        description: 'Get help regarding the bot',
    })

    cmds?.create({
        name: 'math',
        description: 'Get a random math question',
    })

    cmds?.create({
        name: 'solve',
        description: 'Solve a Quadratic Equation',
        options: [{
            name: 'a',
            description: 'the a value of the equation or the first constant number in the equation',
            required: true,
            type: DISCORDJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: 'b',
            description: 'the b value of the equation or the second constant number after x²',
            required: true,
            type: DISCORDJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: 'c',
            description: 'the c value of the equation or the last constant number on the side of expression',
            required: true,
            type: DISCORDJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }],
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === '8ball') {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
          
          const rndInt = randomIntFromInterval(1, 6)
          if(rndInt === 1) {
            interaction.reply({
                content: 'Nah',
                ephermal: false,
            })
          }
          if(rndInt === 2) {
            interaction.reply({
                content: 'Yes',
                ephermal: false,
            })
          }
          if(rndInt === 3) {
            interaction.reply({
                content: 'idk',
                ephermal: false,
            })
          }
          if(rndInt === 4) {
            interaction.reply({
                content: 'No',
                ephermal: false,
            })
          } 
          if(rndInt === 5) {
            interaction.reply({
                content: 'stop it',
                ephermal: false,
            })
          }        
          if(rndInt === 6) {
            interaction.reply({
                content: 'ask <@678983633721360384> about that',
                ephermal: false,
            })
          }
        console.log(rndInt);
    };

    if (commandName === 'probability') {
        interaction.reply({
            content: Math.random()*100 + '%',
            ephermal: false,
        })
    };

    if (commandName === 'dictionary') {
        const word = options.getString('word')
        const def = options.getString('definition')
        const location = 'C:/Users/user/Desktop/Ahsab/bot/Retro BFF/dictionary/'
        const file = location + word + '.txt'
        try {
            fs.writeFile(file, def, err => {
                if(err) {
                    interaction.reply('uhh some problem happened idk what it is but you can try to not include special characters in the word');
                    console.error(err);
                    return;
                }
                interaction.reply('ok done');
            });
        } catch {
            interaction.reply('uhh some problem happened idk what it is but you can try to not include special characters in the word');
        }
    };

    if (commandName === 'help') {
        interaction.reply({
            content: 'some triggers are\n;def\n;udef\n;probability\n;8ball\nmention\nspam my dm\n;spam (only for certain people)\n;math\n;dm (only for certain people)',
            ephermal: false,
        })
    };

    if (commandName === 'math') {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
        const value1 = randomIntFromInterval(0, 100);
        const value2 = randomIntFromInterval(0, 20);
        const type = randomIntFromInterval(1, 2);
        if (type === 1) {
            interaction.reply({
                content: 'here is a random quadratic equation\nx²-'+(Math.round(value1)+Math.round(value2))+'x+'+(Math.round(value1)*Math.round(value2))+'=0',
                ephermal: false,
            });
        } else 
        if (type === 2) {
            interaction.reply({
                content: 'here is a random quadratic equation\n-x²+'+(Math.round(value1)+Math.round(value2))+'x-'+(Math.round(value1)*Math.round(value2))+'=0',
                ephermal: false,
            });
        }
    };

    if (commandName === 'solve') {
        const a = options.getNumber('a')
        const b = options.getNumber('b')
        const c = options.getNumber('c')
        const discriminant = Math.sqrt((b*b)-(4*a*c));

        interaction.reply({
            content: 'the roots are ' + (-b+(discriminant))/(2*a) + ' and ' + (-b-(discriminant))/(2*a) + ' <a:swag:949216231569903626>',
            ephermal: false,
        })
    }
});

// client.on('messageCreate', (message) => {
//    let shit = ['shit', 'Shit', 'SHIT'];
//    let shitreply = false;

//    for (var i in die) {
//        if (message.content.toLowerCase().includes(die[i].toLowerCase())) diereply = true;
//        }
//        if (diereply && !message.author.bot) {
//        message.reply('Go Die!');
//    }

//    for (var i in suicide) {
//        if (message.content.toLowerCase().includes(suicide[i].toLowerCase())) suicidereply = true;
//        }
//        if (suicidereply && !message.author.bot) {
//          message.reply('Do not share content that glorifies or promotes suicide or self-harm, including any encouragement to others to cut themselves or embrace eating disorders such as anorexia or bulimia. Self-harm threats used as a form of emotional manipulation or coercion are also prohibited.');
//        }

//        for (var i in stfu) {
//            if (message.content.toLowerCase().includes(stfu[i].toLowerCase())) stfureply = true;
//            }
//            if (stfureply && !message.author.bot) {
//              message.reply('https://media1.tenor.com/images/4d190f8e518931f91013635afc733fad/tenor.gif?itemid=24965832');
//            }

//    for (var i in shit) {
//        if (message.content.toLowerCase().includes(shit[i].toLowerCase())) shitreply = true;
//        }
//        if (shitreply && !message.author.bot) {
//        message.reply(':poop:');
//    }

//    if (message.content == 'mention') {
//        message.reply({
//            content: '<@'+message.author.id+'>'
//        })
//    }
// })
// client.on('messageCreate', (message) => {
//    if (message.mentions.) {
//        message.reply({
//            content: '<@'+message.author.id+'>'
//        })
//    }
// })

client.on('messageCreate', (message) => {
    if (message.content == 'spam my dm') {
        message.author.send("die").catch(() => {message.reply('bruh you blocked me or dm is closed <:Pagal_Harvey:943088862123655199>')});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
        message.author.send("die").catch(() => {});
    }
});

// client.on('messageCreate', (message) => {
//    if (message.mentions.has("780329178062782475") && !message.author.bot) {
//        message.reply({
//            content:'https://gfycat.com/scrawnyreflectingcardinal/'
//        })
//    }
//});

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        message.reply('some triggers are\n;def\n;udef\n;probability\n;8ball\nmention\nspam my dm\n;spam (only for certain people)\n;math\n;dm (only for certain people)');
    }

    if (command === 'def') {
        const msgs = message.content.slice(4).trim();
        const location = 'C:/Users/user/Desktop/Ahsab/bot/Retro BFF/dictionary/';
        const file = location + msgs + '.txt';
        try {
            if (!msgs || message.author.bot) return;
            if (fs.existsSync(file)) {
                fs.readFile(file, 'utf-8', (err, data) => {
                    if(err) {
                        message.reply('error');
                        console.error(err);
                        return;
                    }
                    message.reply('Definition:\n' + data);
                })
            } else {
                message.reply('not found and what you said is: `' + msgs + '`');
            }
        } catch {message.reply('not found and what you said is: `' + msgs + '`')}
    }
    
    if (command === 'probability'){
        message.reply(Math.random()*100 +'%');
    }

    if (command === 'udef') {
        var msgs = message.content.slice(5).trim();
        try {
            if (!msgs || message.author.bot) return;
         else {
            msgs = msgs.replace(/ /g,"%20")
            message.reply('https://www.urbandictionary.com/define.php?term='+msgs)
            }
        } catch {console.error();}
    }
    
    if (command === 'math'){
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
        const value1 = randomIntFromInterval(0, 100);
        const value2 = randomIntFromInterval(0, 20);
        const type = randomIntFromInterval(1, 2);
        if (type === 1) {
            message.reply('here is a random quadratic equation\nx²-'+(Math.round(value1)+Math.round(value2))+'x+'+(Math.round(value1)*Math.round(value2))+'=0');
        } else 
        if (type === 2) {
            message.reply('here is a random quadratic equation\n-x²+'+(Math.round(value1)+Math.round(value2))+'x-'+(Math.round(value1)*Math.round(value2))+'=0');
        }
    }

    if (command === '8ball'){
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
          
          const rndInt = randomIntFromInterval(1, 6)
          if(rndInt === 1) {
            message.reply('Nah');
          }
          if(rndInt === 2) {
            message.reply('Yes');
          }
          if(rndInt === 3) {
            message.reply('idk');
          }
          if(rndInt === 4) {
            message.reply('No');
          } 
          if(rndInt === 5) {
            message.reply('stop it');
          }        
          if(rndInt === 6) {
            message.reply('ask <@678983633721360384> about that');
          }
        console.log(rndInt);
    }
    
    // Restrict a command to a specific user by ID
    if (message.author.id !== "678983633721360384" && message.author.id !== "947148014676488332" && message.author.id !== "959091572136378439" && message.author.id !== "765099314300715029" && message.author.id !== "713781385692708924" && message.author.id !== "761187683903995914" && message.author.id !== "775769962388127774" && message.author.id !== "783702351135244291" && message.author.id !== "717258035747094563" && message.author.id !== "766294055390412850") return
    if (command === 'spam') {
        let member = message.mentions.users.first();
        try {
            const id = member.id;
            client.users.fetch(id, false).then((user) => {
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {message.reply('bruh that person blocked me or dm is closed <:sheeeeeeeeeeeesh:985843134804131860>')});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
            user.send('this message was directed by <@' + message.author.id + '>').catch(() => {});
        });
        } catch {message.reply('please mention someone noob <:Pagal_Harvey:943088862123655199>')}
    }

    if (command === 'dm') {
        const member = message.mentions.users.first();
        const msgs = args.slice(1).join(" ");
        var Attach = message.attachments;
        try {
            if (!member) {message.reply('please mention someone noob <:Pagal_Harvey:943088862123655199>')}
            if (Attach.size > 0) {
                member.send({
                    content: msgs,
                    files: [{attachment: message.attachments.first().url}]}).catch(() => {message.reply('bruh that person blocked me or dm is closed <:sheeeeeeeeeeeesh:974238574482456586>')});//.catch(() => {message.reply('bruh that person blocked me or dm is closed <:sheeeeeeeeeeeesh:989044218355908609>')});
              } else {
                member.send(msgs).catch(() => {message.reply('bruh that person blocked me or dm is closed <:sheeeeeeeeeeeesh:974238574482456586>')});
              }
        } catch {}
    }
});

} catch(err) {
    console.log('the error is ' + err);
}
client.login(process.env.TOKEN)