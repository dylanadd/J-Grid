
### README for J-Grid: A Dynamic CSS Grid Injection Script

---

#### Description
This jQuery script dynamically injects CSS Grid classes into a `<style>` tag within the `<head>` of an HTML document. The script targets classes prefixed with "j-grid", interpreting these classes to apply CSS Grid properties directly via generated CSS. This approach is designed to seamlessly integrate with HTML elements, enhancing layout capabilities without altering pre-existing Bootstrap setups.

#### Features
- **Dynamic CSS Generation:** Automatically generates CSS based on the classes starting with "j-grid".
- **Conflict Resolution:** Intelligently removes conflicting Bootstrap classes to ensure CSS Grid styles are applied without interference.
- **Responsive Design Support:** Includes media queries matching Bootstrap's breakpoints for responsive layouts.
- **Enhanced Flexibility:** Supports extensive grid configurations, including grid-template columns, rows, and auto-placement.

#### Installation
1. **Include jQuery:** Ensure that jQuery is included in your project. If not already included, add the following line in your HTML's `<head>` tag:
   ```html
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   ```
2. **Add the Script:** Include the dynamic CSS Grid injection script in your project. It's recommended to place the script just before the closing `</body>` tag to ensure all HTML elements are loaded before the script runs:
   ```html
   <script src="path/to/dynamic-grid-injection.js"></script>
   ```

#### Usage
Add the appropriate `j-grid` prefixed classes to your HTML elements based on the desired layout:
- **`j-grid-x`**: Sets the number of columns (x) in your grid.
- **`j-grid-col-x`**: Spans an element across x columns.
- **`j-grid-row-x`**: Spans an element across x rows.
- **Responsive Variants**: Use `j-grid-sm-col-x`, `j-grid-md-row-x`, etc., to apply responsive behaviors matching Bootstrap breakpoints.

Example:
```html
<div class="j-grid-3 j-grid-md-col-2">
  <!-- Content here -->
</div>
```

#### Author
**Dylan Addington**

Dylan Addington has created this script to facilitate advanced CSS Grid layouts using a simplified class-based approach, providing a bridge between static HTML/CSS and dynamic style applications.

#### License
This project is open-sourced under the MIT License. Feel free to use, modify, and distribute the script as needed with attribution back to the author.

---

