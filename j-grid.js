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
    // Function to process the class name and generate CSS
    function processClassName(className) {
        const parts = className.split('-');
        const type = parts[1]; // 'col', 'row', or 'grid'
        const size = parts[2];
        const breakpoint = parts[3];

        let css = '';

        // Define Bootstrap breakpoints
        const breakpoints = {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1400px'
        };

        // Base CSS generation for grid, column, and row properties
        if (type === 'grid') {
            css = `.j-${className} { display: grid; grid-template-columns: repeat(${size}, 1fr); }`;
        } else if (type === 'col') {
            css = `.j-${className} { grid-column: span ${size}; }`;
        } else if (type === 'row') {
            css = `.j-${className} { grid-row: span ${size}; }`;
        }

        // If there's a breakpoint, wrap in a media query
        if (breakpoint && breakpoints[breakpoint]) {
            css = `@media (min-width: ${breakpoints[breakpoint]}) { ${css} }`;
        }

        return css;
    }

    // Collect all elements with classes starting with 'j-grid'
    const allClasses = [];
    $('[class*="j-grid"]').each(function() {
        $(this).attr('class').split(/\s+/).forEach(function(cls) {
            if (cls.startsWith('j-grid') && !allClasses.includes(cls)) {
                allClasses.push(cls);
            }
        });
    });

    // Generate CSS for each unique class
    let dynamicStyles = '';
    allClasses.forEach(function(cls) {
        dynamicStyles += processClassName(cls);
    });

    // Inject styles into the head
    if (dynamicStyles) {
        $('head').append(`<style>${dynamicStyles}</style>`);
    }
});
