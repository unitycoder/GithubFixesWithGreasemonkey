// ==UserScript==
// @name         GitHub README Editor: Add Link Button
// @namespace    http://unitycoder.com/
// @version      1.5
// @description  Add a "Link" button to GitHub README editor to convert selected text to Markdown link syntax
// @author       ChatGPT
// @match        https://github.com/*/*/edit/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    // Function to create and insert the Link button
    function addLinkButton() {
        // Find the toolbar where we want to insert the button
        const toolbar = document.querySelector('.SegmentedControl__SegmentedControlList-sc-1rzig82-0');

        if (!toolbar) return; // If the toolbar is not found, exit

        // Check if the button already exists to avoid duplicates
        if (document.querySelector('#add-link-button')) return;

        // Create a new list item to hold the button
        const newItem = document.createElement('li');
        newItem.className = 'Box-sc-g0xbh4-0'; // Matches existing list item styling
        
        // Create a new button element with GitHub's style
        const linkButton = document.createElement('button');
        linkButton.type = 'button';
        linkButton.id = 'add-link-button'; // Add ID to avoid duplicates
        linkButton.className = 'btn btn-sm hide-sm function-button'; // GitHub's button styling classes
        linkButton.setAttribute('aria-label', 'Add link');
        linkButton.setAttribute('title', 'Add link');
        linkButton.innerText = 'Add link'; // Button text
        linkButton.style.marginLeft = '10px'; // Add left margin of 10px

        // Append the button to the list item
        newItem.appendChild(linkButton);

        // Insert the new item into the toolbar
        toolbar.appendChild(newItem);

        // Add event listener to the button
        linkButton.addEventListener('click', () => {
            // Attempt to get the contenteditable div inside the CodeMirror editor
            const cmContent = document.querySelector('.cm-editor .cm-content[contenteditable="true"]');

            if (cmContent) {
                const selection = window.getSelection();
                const selectedText = selection.toString();

                if (selectedText) {
                    // Prompt the user for the URL
                    const url = prompt('Enter the URL for the link:');
                    if (url) {
                        // Replace the selected text with markdown link syntax
                        const markdownLink = `[${selectedText}](${url})`;
                        document.execCommand('insertText', false, markdownLink);
                    }
                } else {
                    alert('Please select text to create a link.');
                }
            } else {
                alert('Could not find the editor content area.');
            }
        });
    }

    // Function to repeatedly check for the toolbar until it's available
    function checkForToolbar() {
        const toolbar = document.querySelector('.SegmentedControl__SegmentedControlList-sc-1rzig82-0');
        if (toolbar) {
            addLinkButton();
        } else {
            setTimeout(checkForToolbar, 500); // Check again in 500 milliseconds
        }
    }

    // Run the script after the DOM has fully loaded
    document.addEventListener('DOMContentLoaded', checkForToolbar);
})();
