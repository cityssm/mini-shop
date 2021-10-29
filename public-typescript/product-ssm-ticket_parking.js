var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
(function () {
    var urlPrefix = document.querySelector("main").getAttribute("data-url-prefix");
    var formElement = document.querySelector("#form--product");
    var tagNumberIsValidElement = formElement.querySelector("[name='tagNumber-isValid']");
    var tagNumberIsValidIconElement = formElement.querySelector(".tagNumber-isValidIcon");
    var tagNumberIsInvalidMessageElement = formElement.querySelector(".tagNumber-isInvalidMessage");
    var tagNumberPrefixElement = formElement.querySelector("[name='tagNumber-prefix']");
    var tagNumberSuffixElement = formElement.querySelector("[name='tagNumber-suffix']");
    var checkedTagNumbers = new Map();
    var clearTagNumberValidity = function () {
        tagNumberIsValidElement.checked = false;
        tagNumberIsValidIconElement.innerHTML = "";
        tagNumberIsInvalidMessageElement.classList.add("is-hidden");
    };
    var setTagNumberAsValid = function () {
        tagNumberIsValidElement.checked = true;
        tagNumberIsValidIconElement.innerHTML = "<i class=\"fas fa-check has-text-success\" aria-hidden=\"true\"></i>";
        tagNumberIsInvalidMessageElement.classList.add("is-hidden");
    };
    var setTagNumberAsInvalid = function () {
        tagNumberIsValidElement.checked = false;
        tagNumberIsValidIconElement.innerHTML = "<i class=\"fas fa-times has-text-danger\" aria-hidden=\"true\"></i>";
        tagNumberIsInvalidMessageElement.classList.remove("is-hidden");
    };
    var checkTagNumber = function () {
        var tagNumber = tagNumberPrefixElement.value + " " + tagNumberSuffixElement.value;
        if (tagNumber.length !== 8) {
            clearTagNumberValidity();
        }
        else if (checkedTagNumbers.has(tagNumber)) {
            if (checkedTagNumbers.get(tagNumber)) {
                setTagNumberAsValid();
            }
            else {
                setTagNumberAsInvalid();
            }
        }
        else {
            clearTagNumberValidity();
            fetch(urlPrefix + "/products/ssm-ticket_parking/doIsTagNumberEligible", {
                method: "POST",
                body: new URLSearchParams({
                    tagNumber: tagNumber
                })
            })
                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, response.json()];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); })
                .then(function (responseJSON) {
                checkedTagNumbers.set(responseJSON.tagNumber, responseJSON.isEligible);
                checkTagNumber();
                return;
            })
                .catch(function () {
            });
        }
    };
    tagNumberPrefixElement.addEventListener("change", checkTagNumber);
    tagNumberSuffixElement.addEventListener("keyup", checkTagNumber);
})();
