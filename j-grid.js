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
    // This function processes the class name and generates CSS
    function processClassName(className) {
        const parts = className.split('-');
        const type = parts[1]; // 'col', 'row', or 'grid'
        const size = parts.length > 2 ? parts[2] : '';
        const breakpoint = parts.length > 3 ? parts[3] : '';

        let css = '';

        // Define Bootstrap breakpoints
        const breakpoints = {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1400px'
        };

        // Generate CSS based on the type
        if (type === 'grid') {
            css = `.j-${className} { display: grid; grid-template-columns: repeat(${size || 1}, 1fr); }`;
        } else if (type === 'col') {
            css = `.j-${className} { grid-column: span ${size || 1}; }`;
        } else if (type === 'row') {
            css = `.j-${className} { grid-row: span ${size || 1}; }`;
        }

        // If there's a breakpoint, wrap in a media query
        if (breakpoint && breakpoints[breakpoint]) {
            css = `@media (min-width: ${breakpoints[breakpoint]}) { ${css} }`;
        }

        return css;
    }

    // Remove conflicting Bootstrap classes
    function removeConflictingClasses($element) {
        const conflictPatterns = {
            'j-grid': ['d-flex', 'flex-', 'container', 'container-fluid', 'row'],
            'j-grid-col': ['col-', 'col '],
            'j-grid-row': ['row']
        };

        Object.keys(conflictPatterns).forEach(prefix => {
            if ($element.hasClassStartingWith(prefix)) {
                conflictPatterns[prefix].forEach(conflict => {
                    $element.removeClassStartingWith(conflict);
                });
            }
        });
    }

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

    // Collect all elements with classes starting with 'j-grid'
    const allClasses = [];
    $('[class*="j-grid"]').each(function() {
        const $this = $(this);
        $this.attr('class').split(/\s+/).forEach(function(cls) {
            if (cls.startsWith('j-grid') && !allClasses.includes(cls)) {
                allClasses.push(cls);
                removeConflictingClasses($this);
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
