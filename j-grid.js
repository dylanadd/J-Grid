/**
 * Dynamic CSS Grid Injection Script
 * 
 * This script dynamically injects CSS Grid classes into a <style> tag in the document's head.
 * It interprets classes prefixed with "j-grid" to apply CSS Grid properties directly,
 * enhancing layout capabilities while managing potential conflicts with Bootstrap styles.
 * 
 * Features:
 * - Automatically generates and injects CSS for elements with j-grid classes.
 * - Removes conflicting Bootstrap classes to ensure grid styles apply correctly.
 * - Supports responsive grid behaviors with Bootstrap breakpoint compatibility.
 * 
 * Author: Dylan Addington
 * Created to facilitate the use of CSS Grid with a class-based approach in web projects.
 * 
 * GitHub Repository: https://github.com/dylanadd/J-Grid
 * Visit the repository for source code, contribution guidelines, and updates.
 * 
 * Usage:
 * Add j-grid prefixed classes to your HTML elements to define CSS Grid properties.
 * For example, use 'j-grid-3' for three columns, or 'j-grid-md-col-2' for responsive two-column span at the MD breakpoint.
 * 
 * License: MIT
 */

$(document).ready(function() {
    // Custom jQuery functions to check and remove classes based on prefix
    $.fn.hasClassStartingWith = function(prefix) {
        return this.attr('class').split(/\s+/).some(cls => cls.startsWith(prefix));
    };

    $.fn.removeClassStartingWith = function(prefix) {
        this.each(function() {
            var classes = this.className.split(" ").filter(c => !c.startsWith(prefix));
            this.className = $.trim(classes.join(" "));
        });
        return this;
    };

	// Custom jQuery function to check if any class ends with the given suffix
$.fn.hasClassEndingWith = function(suffix) {
    return this.attr('class').split(/\s+/).some(cls => cls.endsWith(suffix));
};

// Custom jQuery function to remove all classes that end with the given suffix
$.fn.removeClassEndingWith = function(suffix) {
    this.each(function() {
        var classes = this.className.split(" ").filter(c => !c.endsWith(suffix));
        this.className = $.trim(classes.join(" "));
    });
    return this;
};


    // Function to process the class name and generate CSS
    function processClassName(className) {
        const parts = className.split('-');
        const type = parts[1]; // 'grid', 'col', or 'row'
        const size = parts[2] || 1; // default size to 1 if not specified
        const breakpoint = parts[3]; // might be undefined if not specified

        let css = '';

        // Define Bootstrap breakpoints
        const breakpoints = {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1400px'
        };

        // Determine the property based on type
        if (type === 'grid') {
            css = `{ display: grid; grid-template-columns: repeat(${size}, 1fr); }`;
        } else if (type === 'col') {
            css = `{ grid-column: span ${size}; }`;
        } else if (type === 'row') {
            css = `{ grid-row: span ${size}; }`;
        }

        // Add media query if breakpoint is specified
        if (breakpoint && breakpoints[breakpoint]) {
            css = `@media (min-width: ${breakpoints[breakpoint]}) { .${className} ${css} }`;
        } else {
            css = `.${className} ${css}`;
        }

        return css;
    }

    // Collect all elements with classes starting with 'j-grid'
    const allClasses = new Set(); // Use a set to avoid duplicates
    $('[class*="j-"]').each(function() {
        const classList = $(this).attr('class').split(/\s+/);
        classList.forEach(cls => {
            if (cls.startsWith('j-')) {
                allClasses.add(cls);
                $(this).removeClassStartingWith('d-flex').removeClassStartingWith('flex-').removeClassStartingWith('justify-content').removeClassEndingWith('-flex');
                $(this).removeClassStartingWith('col-').removeClassStartingWith('col ');
                $(this).removeClassStartingWith('row');
            }
        });
    });

    // Generate CSS for each unique class
    let dynamicStyles = '';
    allClasses.forEach(cls => {
        dynamicStyles += processClassName(cls);
    });

    // Inject styles into the head if there are styles to add
    if (dynamicStyles) {
        $('head').append(`<style>${dynamicStyles}</style>`);
    }
});


