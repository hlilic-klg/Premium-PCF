import { IInputs, IOutputs } from "./generated/ManifestTypes";

// Country code data structure
interface CountryCode {
    code: string;
    dialCode: string;
    name: string;
    flag: string;
}

// Comprehensive list of country codes
const COUNTRY_CODES: CountryCode[] = [
    { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
    { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦" },
    { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
    { code: "IT", dialCode: "+39", name: "Italy", flag: "🇮🇹" },
    { code: "ES", dialCode: "+34", name: "Spain", flag: "🇪🇸" },
    { code: "MX", dialCode: "+52", name: "Mexico", flag: "🇲🇽" },
    { code: "BR", dialCode: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
    { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳" },
    { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "KR", dialCode: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "SG", dialCode: "+65", name: "Singapore", flag: "🇸🇬" },
    { code: "NL", dialCode: "+31", name: "Netherlands", flag: "🇳🇱" },
    { code: "SE", dialCode: "+46", name: "Sweden", flag: "🇸🇪" },
    { code: "NO", dialCode: "+47", name: "Norway", flag: "🇳🇴" },
    { code: "DK", dialCode: "+45", name: "Denmark", flag: "🇩🇰" },
    { code: "FI", dialCode: "+358", name: "Finland", flag: "🇫🇮" },
    { code: "PL", dialCode: "+48", name: "Poland", flag: "🇵🇱" },
    { code: "BE", dialCode: "+32", name: "Belgium", flag: "🇧🇪" },
    { code: "CH", dialCode: "+41", name: "Switzerland", flag: "🇨🇭" },
    { code: "AT", dialCode: "+43", name: "Austria", flag: "🇦🇹" },
    { code: "IE", dialCode: "+353", name: "Ireland", flag: "🇮🇪" },
    { code: "NZ", dialCode: "+64", name: "New Zealand", flag: "🇳🇿" },
    { code: "ZA", dialCode: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "AE", dialCode: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "SA", dialCode: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "IL", dialCode: "+972", name: "Israel", flag: "🇮🇱" }
];

export class PremiumPhoneFormatter implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _notifyOutputChanged: () => void;
    private _context: ComponentFramework.Context<IInputs>;
    
    // UI Elements
    private _mainContainer: HTMLDivElement;
    private _countryDropdown: HTMLDivElement;
    private _selectedCountryButton: HTMLButtonElement;
    private _dropdownList: HTMLDivElement;
    private _phoneInput: HTMLInputElement;
    
    // State
    private _currentValue: string;
    private _selectedCountryCode: CountryCode;
    private _allowedCountries: CountryCode[];
    private _formatPattern: string;
    private _isDropdownOpen = false;
    private _isDisabled = false;

    /**
     * Initialize the control
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;
        
        // Get configuration
        this._formatPattern = context.parameters.formatPattern.raw || "(###) ###-####";
        const defaultCountry = context.parameters.defaultCountryCode.raw || "US";
        const allowedCodes = context.parameters.allowedCountryCodes.raw;
        
        // Filter allowed countries
        if (allowedCodes && allowedCodes.trim() !== "") {
            const codes = allowedCodes.split(',').map((c: string) => c.trim().toUpperCase());
            this._allowedCountries = COUNTRY_CODES.filter(cc => codes.includes(cc.code));
        } else {
            this._allowedCountries = [...COUNTRY_CODES];
        }
        
        // Set default country
        this._selectedCountryCode = this._allowedCountries.find(c => c.code === defaultCountry) || this._allowedCountries[0];
        
        // Build UI
        this.createUI();
        
        // Set initial value
        this._currentValue = context.parameters.phoneNumber.raw || "";
        this.updatePhoneDisplay();
        
        // Check if disabled (read-only mode)
        this._isDisabled = context.mode.isControlDisabled;
        this.updateDisabledState();
    }

    /**
     * Create the user interface
     */
    private createUI(): void {
        // Main container
        this._mainContainer = document.createElement("div");
        this._mainContainer.className = "premium-phone-formatter";
        
        // Country selector dropdown
        this._countryDropdown = document.createElement("div");
        this._countryDropdown.className = "country-dropdown";
        
        // Selected country button
        this._selectedCountryButton = document.createElement("button");
        this._selectedCountryButton.className = "country-selector";
        this._selectedCountryButton.type = "button";
        this._selectedCountryButton.addEventListener("click", () => this.toggleDropdown());
        
        // Dropdown list
        this._dropdownList = document.createElement("div");
        this._dropdownList.className = "dropdown-list";
        this._dropdownList.style.display = "none";
        
        this.populateCountryList();
        
        this._countryDropdown.appendChild(this._selectedCountryButton);
        this._countryDropdown.appendChild(this._dropdownList);
        
        // Phone input
        this._phoneInput = document.createElement("input");
        this._phoneInput.type = "tel";
        this._phoneInput.className = "phone-input";
        this._phoneInput.placeholder = this._context.parameters.placeholderText.raw || "Enter phone number";
        this._phoneInput.addEventListener("input", () => this.handlePhoneInput());
        this._phoneInput.addEventListener("blur", () => this.handleBlur());
        this._phoneInput.addEventListener("focus", () => this.handleFocus());
        
        // Assemble
        this._mainContainer.appendChild(this._countryDropdown);
        this._mainContainer.appendChild(this._phoneInput);
        this._container.appendChild(this._mainContainer);
        
        // Click outside to close dropdown
        document.addEventListener("click", (e) => this.handleClickOutside(e));
        
        this.updateSelectedCountryDisplay();
    }

    /**
     * Populate the country dropdown list
     */
    private populateCountryList(): void {
        this._dropdownList.innerHTML = "";
        
        this._allowedCountries.forEach(country => {
            const item = document.createElement("div");
            item.className = "dropdown-item";
            
            const showFlags = this._context.parameters.showCountryFlags.raw !== false;
            
            if (showFlags) {
                const flag = document.createElement("span");
                flag.className = "country-flag";
                flag.textContent = country.flag;
                item.appendChild(flag);
            }
            
            const dialCode = document.createElement("span");
            dialCode.className = "dial-code";
            dialCode.textContent = country.dialCode;
            item.appendChild(dialCode);
            
            const name = document.createElement("span");
            name.className = "country-name";
            name.textContent = country.name;
            item.appendChild(name);
            
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                this.selectCountry(country);
            });
            
            this._dropdownList.appendChild(item);
        });
    }

    /**
     * Update the selected country button display
     */
    private updateSelectedCountryDisplay(): void {
        const showFlags = this._context.parameters.showCountryFlags.raw !== false;
        
        this._selectedCountryButton.innerHTML = "";
        
        if (showFlags) {
            const flag = document.createElement("span");
            flag.className = "country-flag";
            flag.textContent = this._selectedCountryCode.flag;
            this._selectedCountryButton.appendChild(flag);
        }
        
        const dialCode = document.createElement("span");
        dialCode.className = "dial-code";
        dialCode.textContent = this._selectedCountryCode.dialCode;
        this._selectedCountryButton.appendChild(dialCode);
        
        const arrow = document.createElement("span");
        arrow.className = "dropdown-arrow";
        arrow.textContent = "▼";
        this._selectedCountryButton.appendChild(arrow);
    }

    /**
     * Toggle dropdown visibility
     */
    private toggleDropdown(): void {
        if (this._isDisabled) return;
        
        this._isDropdownOpen = !this._isDropdownOpen;
        this._dropdownList.style.display = this._isDropdownOpen ? "block" : "none";
        this._countryDropdown.classList.toggle("open", this._isDropdownOpen);
    }

    /**
     * Select a country from the dropdown
     */
    private selectCountry(country: CountryCode): void {
        this._selectedCountryCode = country;
        this.updateSelectedCountryDisplay();
        this.toggleDropdown();
        this._phoneInput.focus();
    }

    /**
     * Handle click outside to close dropdown
     */
    private handleClickOutside(event: MouseEvent): void {
        if (!this._countryDropdown.contains(event.target as Node)) {
            if (this._isDropdownOpen) {
                this.toggleDropdown();
            }
        }
    }

    /**
     * Handle phone input changes
     */
    private handlePhoneInput(): void {
        const rawValue = this._phoneInput.value;
        const digitsOnly = rawValue.replace(/\D/g, "");
        
        // Apply format pattern
        const formatted = this.applyFormat(digitsOnly);
        this._phoneInput.value = formatted;
        
        // Store the full value with country code
        this._currentValue = digitsOnly ? `${this._selectedCountryCode.dialCode}${digitsOnly}` : "";
        
        this._notifyOutputChanged();
    }

    /**
     * Apply the format pattern to phone digits
     */
    private applyFormat(digits: string): string {
        if (!digits) return "";
        
        let formatted = "";
        let digitIndex = 0;
        
        for (let i = 0; i < this._formatPattern.length && digitIndex < digits.length; i++) {
            const char = this._formatPattern[i];
            if (char === "#") {
                formatted += digits[digitIndex];
                digitIndex++;
            } else {
                formatted += char;
            }
        }
        
        // Add remaining digits if any
        while (digitIndex < digits.length) {
            formatted += digits[digitIndex];
            digitIndex++;
        }
        
        return formatted;
    }

    /**
     * Update phone display from stored value
     */
    private updatePhoneDisplay(): void {
        if (!this._currentValue) {
            this._phoneInput.value = "";
            return;
        }
        
        // Parse the stored value to extract country code and number
        let phoneNumber = this._currentValue;
        
        // Try to match country code
        for (const country of this._allowedCountries) {
            if (phoneNumber.startsWith(country.dialCode)) {
                this._selectedCountryCode = country;
                phoneNumber = phoneNumber.substring(country.dialCode.length);
                break;
            }
        }
        
        // Remove any non-digits
        const digitsOnly = phoneNumber.replace(/\D/g, "");
        
        // Apply formatting
        this._phoneInput.value = this.applyFormat(digitsOnly);
        this.updateSelectedCountryDisplay();
    }

    /**
     * Handle input focus
     */
    private handleFocus(): void {
        this._mainContainer.classList.add("focused");
    }

    /**
     * Handle input blur
     */
    private handleBlur(): void {
        this._mainContainer.classList.remove("focused");
    }

    /**
     * Update disabled state based on form mode
     */
    private updateDisabledState(): void {
        this._phoneInput.disabled = this._isDisabled;
        this._selectedCountryButton.disabled = this._isDisabled;
        
        if (this._isDisabled) {
            this._mainContainer.classList.add("disabled");
            if (this._isDropdownOpen) {
                this.toggleDropdown();
            }
        } else {
            this._mainContainer.classList.remove("disabled");
        }
    }

    /**
     * Called when any value in the property bag has changed
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._context = context;
        
        // Check if disabled state changed
        const isDisabled = context.mode.isControlDisabled;
        if (this._isDisabled !== isDisabled) {
            this._isDisabled = isDisabled;
            this.updateDisabledState();
        }
        
        // Update value if changed externally
        const newValue = context.parameters.phoneNumber.raw || "";
        if (newValue !== this._currentValue) {
            this._currentValue = newValue;
            this.updatePhoneDisplay();
        }
    }

    /**
     * Return the outputs of the control
     */
    public getOutputs(): IOutputs {
        return {
            phoneNumber: this._currentValue
        };
    }

    /**
     * Cleanup when control is destroyed
     */
    public destroy(): void {
        // Remove event listeners
        document.removeEventListener("click", (e) => this.handleClickOutside(e));
    }
}
