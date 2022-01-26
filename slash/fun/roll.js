module.exports = {
    name: "roll",
    description: "rolling dice",
    options: [
        {
            name: "dice",
            description: "The dice default is 100",
            type: 3
        }
    ],
    category: "fun",
    run: async(interaction) => {
        const number = interaction.options.getString('dice') || 100;
        if (isNaN(number)) {
            return interaction.reply({ content: ":x: invaild number" })
        }
        const getRandomNumber = Math.floor(Math.random() * number);
        interaction.reply(getRandomNumber.toString());
    }
}