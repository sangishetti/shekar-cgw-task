import { LightningElement, api } from 'lwc';

export default class PassStrengthChecker extends LightningElement {

    _password = '';
    _confirmPassword = '';

    requirements = [
        {
            id: 'pass-1',
            label: '8-20 characters',
            isValid: false
        },
        {
            id: 'pass-2',
            label: 'At least one capital letter',
            isValid: false
        },
        {
            id: 'pass-3',
            label: 'At least one number',
            isValid: false
        },
        {
            id: 'pass-4',
            label: 'No spaces',
            isValid: false
        }
    ];

    @api
    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value || '';

        // Reset child divs to default
        this.requirements = this.requirements.map(req => {
            return { ...req, isValid: false };
        });

        // Validate requirements
        // Length
        this.requirements[0].isValid = this._password.length >= 8 && this._password.length <= 20;

        // Uppercase
        this.requirements[1].isValid = /[A-Z]/.test(this._password);

        // Number 
        this.requirements[2].isValid = /\d/.test(this._password);

        // No spaces
        this.requirements[3].isValid = !/\s/.test(this._password) && this._password != '';

        // Update each line based on validity
        this.template.querySelectorAll('p[data-req]').forEach((elem, index) => {
            const isValid = this.requirements[index].isValid;
            const hasSuccess = elem.classList.contains('success');
            const hasError = elem.classList.contains('error');

            if (isValid) {
                if (hasError) {
                    elem.classList.remove('error');
                }
                elem.classList.add('success');
            } else {
                if (hasSuccess) {
                    elem.classList.remove('success');
                }
                elem.classList.add('error');
            }
        })
        // Check password match
        //this.checkPasswordMatch();
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('validitychange', { bubbles: true, composed: true,
            detail: { message : this.requirements }
        }));
    }

    @api
    get confirmPassword() {
        return this._confirmPassword;
    }

    set confirmPassword(value) {
        this._confirmPassword = value || '';

        // Check password match
        this.checkPasswordMatch();
    }

    checkPasswordMatch() {
        const matchIndicator = this.template.querySelector('#password-match-indicator');
        if (this._password === this._confirmPassword && this._confirmPassword !== '') {
            matchIndicator.classList.add('match');
            matchIndicator.classList.remove('no-match');
        } else {
            matchIndicator.classList.add('no-match');
            matchIndicator.classList.remove('match');
        }
    }

    handleFocus() {
        // Reset to default
        this.requirements = this.requirements.map(req => {
            return { ...req, isValid: false };
        });
    }

    handleBlur() {
        // Set error state
        this.requirements.forEach(req => {
            if (!req.isValid) {
                req.isValid = false;
            }
        });
    }

}