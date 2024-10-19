import { LightningElement } from 'lwc';

export default class TestLwc extends LightningElement {

    connectedCallback() {
        // Add event listener when component is inserted into the DOM
        window.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    disconnectedCallback() {
        // Clean up event listener when component is removed from the DOM
        window.removeEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleClick() {
        // Show an alert message
        alert('Button was clicked!');
    }

    handleKeydown(event) {
        // Check if Enter key is pressed
        if (event.key === 'Enter') {
            // Find the button element and simulate a click
            const button = this.template.querySelector('lightning-button');
            if (button) {
                button.click();
            }
        }
    }
}