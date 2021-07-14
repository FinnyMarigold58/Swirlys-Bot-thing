const discord = require('discord.js');
const _client = new discord.Client();
const { prefix,token } = require('./config.json');
var intervalIds = [];
var intervalId = null;
var trainingsScheduled = [];
var trainingsHosts = [];
var shiftsScheduled = [];
var shiftsHosts = [];

_client.once('ready', () => {
    console.log('Ready!')
    _client.user.setActivity('Swirlyz Sessions', { type: 'WATCHING'})
});

_client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot || !message.guild.id === '787796196126359603') return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(message.member.roles.cache.has('794355421141794836')) {
    if(command === 'training') {
         if(!args[0]) {
            message.channel.send(`<@${message.author.id}> Please specify a time!`)
        }else if(isNaN(args[0])) {
            message.channel.send(`Don't try breaking me now.`)
        }else if(args[0] < 5 || args[0] > 30) {
            message.channel.send('Number bettween 5 and 30 please.')
        }else {
                const tchannel = _client.channels.cache.get('787849858903179265');
                tchannel.send(`Swirlyz | Training | Host:<@${message.author.id}>  | Time: ${args[0]} minutes | There’s currently a training session that is about to commence. Make sure you’re in the session and be ready to be trained. MR+ needed for assistance! <@&787852153128484885>`)
                message.delete().catch(err =>{
                    message.channel.send("Missing manage messages perms.")
                })
                console.warn(`${message.author.username}#${message.author.discriminator} did training with the number ${args[0]}`)
            }
            }
            if(command === 'shift') {
                if(!args[0]) {
                    message.channel.send(`<@${message.author.id}> Please specify a time!`)
                }else if(isNaN(args[0])) {
                    message.channel.send(`Don't try breaking me now.`)
                }else if(args[0] < 5 || args[0] > 30) {
                    message.channel.send('Number bettween 5 and 30 please.')
                }else {
                        const schannel = _client.channels.cache.get('787852513197424640');
                        schannel.send(`Swirlyz | Shift | Host:<@${message.author.id}>  | Time: ${args[0]} minutes | Hey! I'm hosting a shift at the moment,  why not come at the Parlor for a possible promotion? <@&788540866310569995>`)
                        message.delete().catch(err =>{
                            message.channel.send("Missing manage messages perms.")
                        })
                        console.warn(`${message.author.username}#${message.author.discriminator} did training with the number ${args[0]}`)
                    }
                    } 
            if(command === 'straining') {
                if(!args[0]) {message.channel.send('Please specify in minutes from now, when should the training be announced.')
                } else if(!args[1]) {message.channel.send('Please specify how long until the training starts after the announcement')
                } else if(isNaN(args[0]) || isNaN(args[1])) {
                    message.channel.send(`Don't try breaking me now.`)
                } else {
                    const stime = args[0] *1000 //Gets the time giving to announce in milliseconds
                    message.delete()
                    message.channel.send(`<@${message.author.id}> Scheduled for the announcement in ${args[0]} mins.`)

                    var today = new Date();
                    var hours = today.getHours();
                    var minutes = today.getMinutes() + args[0];
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0'+minutes : minutes;
                    var annTime = hours + ':' + minutes;

                    console.warn(`${message.author.username}#${message.author.discriminator} did straining with the number ${args[0]} and ${args[1]} announces at ${annTime}`)
                    // Announces training when time
                    intervalId = setTimeout(function(){
                        const tchannel = _client.channels.cache.get('787849858903179265');
                        tchannel.send(`Swirlyz | Training | Host:<@${message.author.id}>  | Time: ${args[0]} minutes | There’s currently a training session that is about to commence. Make sure you’re in the session and be ready to be trained. MR+ needed for assistance! <@&787852153128484885>`)

                        const index = trainingsScheduled.indexOf(annTime);
                        if (index > -1) {
                    trainingsScheduled.splice(index, 1);
                    trainingsHosts.splice(index, 1)
                                        }
                    }, stime 
                    );
                    intervalIds.push(intervalId)
                    trainingsScheduled.push(annTime)
                    trainingsHosts.push(`${message.author.username}#${message.author.discriminator}`)
                };
            }
            if(command === 'sshift') {
                if(!args[0]) {message.channel.send('Please specify in minutes from now, when should the shift be announced.')
                } else if(!args[1]) {message.channel.send('Please specify how long until the shift starts after the announcement')
                } else if(isNaN(args[0]) || isNaN(args[1])) {
                    message.channel.send(`Don't try breaking me now.`)
                } else {
                    const stime = args[0] * 60000 //Gets the time giving to announce in milliseconds

                    var today = new Date();
                    var hours = today.getHours();
                    var minutes = today.getMinutes();
                  minutes = minutes + args[0]
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0'+minutes : minutes;
                    var annTime = hours + ':' + minutes;

                    message.delete()
                    message.channel.send(`<@${message.author.id}> Scheduled to announce in ${args[0]} mins!`)
                    console.warn(`${message.author.username}#${message.author.discriminator} did sshift with the number ${args[0]} and ${args[1]}`)
                    // Announces training when time
                    setTimeout(function(){
                        const schannel = _client.channels.cache.get('787852513197424640');
                        schannel.send(`Swirlyz | Shift | Host:<@${message.author.id}>  | Time: ${args[0]} minutes | Hey! I'm hosting a shift at the moment,  why not come at the Parlor for a possible promotion? <@&788540866310569995>`)
                        
                        const index = shiftsScheduled.indexOf(annTime);
                        if (index > -1) {
                    shiftsScheduled.splice(index, 1);
                    shiftsHosts.splice(index, 1)
                        }
                    }, stime 
                    
                    );
                    shiftsScheduled.push(annTime)
                    shiftsHosts.push(`${message.author.username}#${message.author.discriminator}`)
                }
            }

         if(command === 'scheduled') {
            const filter = m => m.author.id ===  message.author.id;
            message.channel.send(`Say "trainings" to view trainings and "shifts to view shifts or "cancel" to cancel`)
            message.channel.awaitMessages(filter, {
            max: 1, // leave this the same
            time: 30000, // time in MS. there are 1000 MS in a second
               }).then(async(collected) => {
                if(collected.first().content === 'cancel'){
                message.reply('Command cancelled.')
            }
            if(collected.first().content === 'trainings'){
                if(trainingsScheduled.length > 0){
                    let embed = new discord.MessageEmbed()

                    .setAuthor("Scheduled Trainings")
                    .setColor("#92BA2F")
                    .setThumbnail(_client.user.avatarURL)
                    .setTimestamp(Date.now());
                    trainingsScheduled.forEach(entry => {
                     const index = trainingsScheduled.indexOf(entry)
                    embed.addField(entry, `Hosted by: ${trainingsHosts[index]}`);
                    });
                    message.channel.send(embed)
                } else{
                    let embed = new discord.MessageEmbed()
                    .setAuthor("Scheduled Trainings")
                    .setThumbnail(_client.user.avatarURL)
                    .setTimestamp(Date.now())
                    .addField("Currently No Scheduled Trainings", "You should host one :)")
                    message.channel.send(embed)
                }
            }
                if(collected.first().content === 'shifts'){
                    if(shiftsScheduled.length > 0){
                        let embed = new discord.MessageEmbed()

                        .setAuthor("Scheduled Shifts")
                        .setColor("#92BA2F")
                        .setThumbnail(_client.user.avatarURL)
                        .setTimestamp(Date.now());
                        shiftsScheduled.forEach(entry => {
                         const index = shiftsScheduled.indexOf(entry)
                        embed.addField(entry, `Hosted by: ${shiftsHosts[index]}`);
                        });
                        message.channel.send(embed)
                    } else{
                        let embed = new discord.MessageEmbed()
                        .setAuthor("Scheduled Shifts")
                        .setThumbnail(_client.user.avatarURL)
                        .setTimestamp(Date.now())
                        .addField("Currently No Scheduled Shifts", "You should host one :)")
                        message.channel.send(embed)
                    }
                }
            console.log(`Recived : ${collected.first().content} - from ${message.author.username}#${message.author.discriminator} - s.scheduled`)
            }).catch(() => {
                // what to do if a user takes too long goes here 
            
            message.reply('You took too long!') 
            });
         } 
        } else {
            message.channel.send("Missing a Authorized Role")
        }
    }
,);
_client.login(token);