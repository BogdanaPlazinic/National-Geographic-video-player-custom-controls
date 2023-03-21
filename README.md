# National-Geographic-video-player-with-custom-controls
In this project, I designed the user interface following the official design of the [National Geographic website](https://www.nationalgeographic.com/). 
A video with custom controls and a drop-down menu was created.

Technology used in the project: **HTML, CSS, Javascript**.

**Live demo:** https://video-player-custom-controls.netlify.app/

Desktop view:

![My Image](https://github.com/BogdanaPlazinic/National-Geographic-video-player-custom-controls/blob/master/md-img/National%20Geographic%20desktop.gif)

Mobile view:

![My Image](https://github.com/BogdanaPlazinic/National-Geographic-video-player-custom-controls/blob/master/md-img/National%20Geographic%20mobile.gif)


# HTML

Google fonts **Roboto** and **Font Awesome** were used for icons and font.
Google fonts and Font awesome are linked via a link within the `<head>` tag.

The <video> tag for the video is used, where the controls attribute is omitted.

    <video  class="player-video"  src="/media/WildLifeOfficialTrailer.mp4"></video>
By omitting the controls attribute, we turn off the default controls in the video.

# CSS

Created layout using flexbox.

Created responsive design using break points:

    @media  (max-width:  965px)
    @media  (max-width:  640px)
    @media  (max-width:  480px)
    @media  (max-width:  400px)

Created a menu that will be displayed on smaller resolutions, starting from 640px.

    @media  (max-width:  640px)  {
	    .mobile-menu  {
	    display:  block;
	    }
    }


# Javascript

## Menu

Created event listener for menu functionality:

   

    menu.addEventListener('click',  ()  =>  {
    menu.classList.toggle('active');
    navigation.classList.toggle('active');
    })

And a function that removes the active `<div>` when the menu element is selected:

    document.querySelectorAll(  '.menu-item'  ).forEach(nav => nav.addEventListener('click',  ()  =>  {
    menu.classList.remove('active');
    navigation.classList.remove('active');
    }))

## Player functions
The code block includes functionality created using the "play" and "pause" keywords. Additionally, there is a function that, depending on whether the code block is executed, will display an icon that is entered using the primitive data type - string.

    function  togglePlay()  {
	    if  (playerVideo.paused)  {
	    playerVideo.play();
	    }  else  {
	    playerVideo.pause();
	    }
    }
    
    function  updateBtn()  {
	    const  icon  =  this.paused  ?  '►'  :  '❚ ❚';
	    playBtn.textContent  = icon;
    }



## Skip function
Using parseFloat() which includes dataset from html.

>**parseFloat()** picks the longest substring starting from the beginning that generates a valid number literal. If it encounters an invalid character, it returns the number represented up to that point, ignoring the invalid character and all characters following it.

js

    function  skip()  {
    	playerVideo.currentTime  +=  parseFloat(this.dataset.skip);
    }
    
    skipButtons.forEach(button => button.addEventListener('click', skip));
    
html

    <button  data-skip="-10"  class="skip-btn-10">« 10s</button>
    <button  data-skip="25"  class="skip-btn-25">25s »</button>

# Progress function
The idea is to calculate the time in percentages, so that flexBasis (which is in percentages) "understands" the value.
js

    function  progressTime()  {
	    const  percent  =  (playerVideo.currentTime  / playerVideo.duration)  *  100;
	    progressBar.style.flexBasis  =  `${percent}%`;
    }
    playerVideo.addEventListener('timeupdate', progressTime);

css

    .progress-bar  {
	    flex-basis:  0%;
    }



## Progress resize function

Using the offsetX and offsetWidth objects, we get the orientation where the user clicked, and when we multiply that value by the duration of the video, we get the video rewind functionality.

    function  progressResize(e)  {
    	const  time  =  (e.offsetX  / progress.offsetWidth)  * playerVideo.duration;
    	playerVideo.currentTime  = time;
    }
    
    let mousedown =  false;
    
    progress.addEventListener('click', progressResize);
    progress.addEventListener('mousedown',  ()  => mousedown =  true);
    progress.addEventListener('mouseup',  ()  => mousedown =  false);
    progress.addEventListener('mousemove',  (e)  => mousedown &&  progressResize(e));

# FullWidth function
The requestFullscreen method is used.

js

    function  fullScreen()  {
	    if  (playerVideo.requestFullscreen)  {
	    playerVideo.requestFullscreen();
	    }
    }

The problem is when fullscreen is active the controls appear even though they are removed from the html.

The solution to this problem:

Resource: https://css-tricks.com/custom-controls-in-html5-video-full-screen/#aa-determining-pseudo-elements-associated-with-shadow-dom-elements

css

    .player-video::-webkit-media-controls  {
	    display:  none  !important;
    }


# Prerequisites

Before you begin, ensure you have met the following requirements:
	- [Git](https://git-scm.com/downloads) must be installed on your operating system.

## Run locally

To run **National-Geographic-video-player-custom-controls** locally, run this command on your git bash:

Linux and macOS:

    sudo git clone https://github.com/BogdanaPlazinic/National-Geographic-video-player-custom-controls.git

Windows:

    git clone https://github.com/BogdanaPlazinic/National-Geographic-video-player-custom-controls.git

## Contact

If you want to contact me you can reach me at [LinkedIn](https://www.linkedin.com/in/bogdana-plazinic/).

## Licence

This project is **free to use** and does not contains any license.
