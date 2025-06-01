const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('Installing svg2img package...');
exec('npm install svg2img', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing svg2img: ${error}`);
    return;
  }
  
  console.log('Converting SVG to ICO...');
  const svg2img = require('svg2img');
  
  // Read the SVG file
  const svgPath = path.join(__dirname, 'public', 'assets', 'favicon.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  // Convert SVG to PNG
  svg2img(svgContent, { width: 32, height: 32 }, function(error, buffer) {
    if (error) {
      console.error(`Error converting SVG to PNG: ${error}`);
      return;
    }
    
    // Write the PNG file
    const pngPath = path.join(__dirname, 'public', 'favicon.png');
    fs.writeFileSync(pngPath, buffer);
    console.log('PNG file created.');
    
    // Install png-to-ico package
    exec('npm install png-to-ico', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing png-to-ico: ${error}`);
        return;
      }
      
      const pngToIco = require('png-to-ico');
      
      // Convert PNG to ICO
      pngToIco([pngPath])
        .then(buf => {
          // Write the ICO file
          const icoPath = path.join(__dirname, 'public', 'favicon.ico');
          fs.writeFileSync(icoPath, buf);
          console.log('ICO file created and saved to public/favicon.ico');
          
          // Clean up the PNG file
          fs.unlinkSync(pngPath);
          console.log('Temporary PNG file removed.');
        })
        .catch(err => {
          console.error(`Error converting PNG to ICO: ${err}`);
        });
    });
  });
}); 