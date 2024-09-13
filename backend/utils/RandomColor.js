const RandomColor = () => {
     const colorPattern = 'ABCDEF0123456789';


     let colors = "#"

     for (let i = 0; i < 6; i++) {
          const randomChar = colorPattern[Math.floor(Math.random() * colorPattern.length)]
          colors += randomChar;
     }

     return colors;

};
 

module.exports = RandomColor;