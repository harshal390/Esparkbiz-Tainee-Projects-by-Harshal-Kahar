let wordpress_tab = document.getElementById('wordpress_tab');
let magento_tab = document.getElementById('magento_tab');
let laravel_tab = document.getElementById('laravel_tab');
let php_tab = document.getElementById('php_tab');
let blue = "#6a88b6";
let light_blue = "#e4eeff";
let dark_color = "#0a2259";
let extra_light_blue = "#f0f6ff";
let section_1 = document.getElementById('wordpress');
let section_2 = document.getElementById('magento');
let section_3 = document.getElementById('laravel');
let section_4 = document.getElementById('php');

let tabs = [wordpress_tab, magento_tab, laravel_tab, php_tab];
let sections = [section_1, section_2, section_3, section_4]


tabs.map(ele => {
    ele.addEventListener('click', () => {
        console.log(ele);
        //starting from reset bg & color of tabs
        tabs.map(element => {
            element.style.backgroundColor = extra_light_blue;
            element.style.color = blue;
        });

        sections.map(element => {
            element.style.display = "none";
        });

        if (ele == wordpress_tab) {
            wordpress_tab.style.backgroundColor = blue;
            wordpress_tab.style.color = dark_color;
            section_1.style.display = "flex";
            section_1.classList.add("tab_section");

        }
        else if (ele == magento_tab) {
            magento_tab.style.backgroundColor = blue;
            magento_tab.style.color = dark_color;
            section_2.style.display = "flex";
            section_2.classList.add("tab_section");
        }
        else if (ele == laravel_tab) {
            laravel_tab.style.backgroundColor = blue;
            laravel_tab.style.color = dark_color;
            section_3.style.display = "flex";
            section_3.classList.add("tab_section");
        }
        else if (ele == php_tab) {
            php_tab.style.backgroundColor = blue;
            php_tab.style.color = dark_color;
            section_4.style.display = "flex";
            section_4.classList.add("tab_section");
        }
        else {
            ele.style.backgroundColor = extra_light_blue;
            ele.style.color = blue;
        }



    })
})