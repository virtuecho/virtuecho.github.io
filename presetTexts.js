// ==UserScript==
// @name         预设文本填充器
// @namespace    https://github.com/virtuecho/virtuecho.github.io/blob/main/presetTexts.js
// @version      2025-10-19-7.0
// @description  填充预设文本并自动聚焦
// @updateURL    https://github.com/virtuecho/virtuecho.github.io/blob/main/presetTexts.js
// @downloadURL  https://github.com/virtuecho/virtuecho.github.io/blob/main/presetTexts.js
// @author       Your Name
// @match        https://chat.deepseek.com/*
// @match        https://gemini.google.com/*
// @match        https://chatgpt.com/*
// @match        https://yuanbao.tencent.com/*
// @match        https://chat.qwen.ai/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        .preset-buttons-container {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin: 2px 0;
            padding: 2px 4px;
            background-color: #f0f0f0;
            border-radius: 4px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            z-index: 9999;
            font-size: 12px;
            max-width: 100%;
        }

        .preset-button {
            background-color: #4a6fa5;
            color: white;
            border: none;
            padding: 3px 6px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 11px;
            line-height: 1.2;
            transition: all 0.15s;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            white-space: nowrap;
        }

        .preset-button:hover {
            background-color: #3a5a8c;
            transform: translateY(-1px);
            box-shadow: 0 2px 3px rgba(0,0,0,0.1);
        }

        .preset-button:active {
            transform: translateY(0);
        }

        .preset-button-highlight {
            animation: highlight 0.6s ease;
        }

        @keyframes highlight {
            0% { background-color: #4a6fa5; }
            50% { background-color: #ff9800; }
            100% { background-color: #4a6fa5; }
        }

        .preset-button-success {
            background-color: #4CAF50 !important;
        }

        .preset-button-error {
            background-color: #f44336 !important;
        }
    `);

    const defaultPresetTexts = [
        { name: "CCC", text: "I am about to send you the contents that our teacher gave us. Please help me to explain the ideas, concepts and the meanings of these contents below. The more detailed the better, so that I can understand! Please explain what this contents is talking about, and remember to use Simplified Chinese. The clearer the better, DO NOT OUTPUT in LaTeX math formatting and/or LaTeX math syntax:\n" },
        { name: "TTT", text: "Continue to translate these below, remember YOU ARE designed to act as a sophisticated translator, translating any given language into Simplified Chinese. It focuses on achieving natural, fluid, and authentic expressions in the translations, avoiding a translational tone. The translations provided will strive for elegance and sophistication in word choice, ensuring that the meaning of EVERY SINGLE SENTENCE AND WORDS is conveyed accurately and gracefully. Additionally, please retain the original terminology with annotations. NO explanation before and after translation, NO SUMMARIES, NO Brackets, NO （注：）, KEEP MARKDOWN FORMAT with html, KEEP THE ORIGINAL LINKS IN TEXT:\n" }
    ];

    let presetTexts = GM_getValue('presetTexts', defaultPresetTexts);

    GM_registerMenuCommand("编辑预设文本", function() {
        let newTexts = prompt("请输入新的预设文本（JSON格式）：", JSON.stringify(presetTexts, null, 2));
        if (newTexts) {
            try {
                presetTexts = JSON.parse(newTexts);
                GM_setValue('presetTexts', presetTexts);
                location.reload();
            } catch (e) {
                alert("解析JSON失败：" + e.message);
            }
        }
    });

    const inputSelectors = [
        '.ql-editor',
        '._27c9245.ds-scroll-area.d96f2d2a',
        'ql-editor.textarea.new-input-ui',
        '[contenteditable="true"]:not([aria-readonly="true"])',
        'textarea',
        'input[type="text"]',
        '.ProseMirror',
        '.DraftEditor-root',
    ];

    function setupPresetButtons() {
        let editors = [];
        inputSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (el.offsetWidth > 0 && el.offsetHeight > 0 && !el.dataset.presetButtonsAdded) {
                    editors.push(el);
                    el.dataset.presetButtonsAdded = "true";
                }
            });
        });

        if (editors.length === 0) return;

        editors.forEach(editor => {
            let container = editor.parentElement;
            let parent = editor;
            for (let i = 0; i < 5 && parent; i++) {
                if (parent.classList && (
                    parent.classList.contains('ql-container') ||
                    parent.classList.contains('text-input-field') ||
                    parent.classList.contains('chat-message-input-container-inner')
                )) {
                    container = parent;
                    break;
                }
                parent = parent.parentElement;
            }

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'preset-buttons-container';

            const buttonGroup = document.createElement('div');
            buttonGroup.style.display = 'flex';
            buttonGroup.style.gap = '4px';

            presetTexts.forEach(preset => {
                const button = document.createElement('button');
                button.className = 'preset-button';
                button.textContent = preset.name;
                button.title = preset.text;
                button.dataset.text = preset.text;

                button.addEventListener('click', () => {
                    button.classList.add('preset-button-highlight');
                    setTimeout(() => button.classList.remove('preset-button-highlight'), 600);
                    fillEditor(editor, preset.text);
                });

                buttonGroup.appendChild(button);
            });

            buttonContainer.appendChild(buttonGroup);
            container.insertBefore(buttonContainer, editor);
        });
    }

    function fillEditor(editor, text) {
        try {
            // ✅ 保留一个换行，但确保不以空行结尾
            text = text.replace(/\n+$/, '') + '\n';

            if (editor.hasAttribute('contenteditable') && editor.getAttribute('contenteditable') !== 'true') {
                showStatus("输入框当前不可编辑", "error");
                return;
            }

            let finalText = text;

            if (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') {
                editor.value = finalText;
                // ✅ 自动聚焦 + 光标到末尾
                editor.focus();
                const len = editor.value.length;
                editor.setSelectionRange(len, len);
            } else {
                // 富文本编辑器处理
                const fragment = document.createDocumentFragment();
                const lines = finalText.split('\n');
                lines.forEach((line, index) => {
                    const p = document.createElement('p');
                    p.textContent = line || '\u200B';
                    fragment.appendChild(p);
                    if (index < lines.length - 1) {
                        fragment.appendChild(document.createElement('br'));
                    }
                });
                while (editor.firstChild) editor.removeChild(editor.firstChild);
                editor.appendChild(fragment);
                editor.focus();
            }

            // 触发 input 事件（必要）
            const delay = window.location.hostname === 'chat.qwen.ai' ? 50 : 0;
            setTimeout(() => {
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                editor.dispatchEvent(inputEvent);
            }, delay);

            showStatus("已填充并聚焦", "success");
        } catch (e) {
            console.error("填充文本时出错:", e);
            showStatus("填充失败: " + e.message, "error");
        }
    }

    function showStatus(message, type) {
        const statusBar = document.createElement('div');
        statusBar.textContent = message;
        statusBar.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 6px 12px;
            border-radius: 4px;
            color: white;
            z-index: 99999;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            opacity: 1;
            transition: opacity 0.4s;
        `;
        document.body.appendChild(statusBar);
        setTimeout(() => {
            statusBar.style.opacity = '0';
            setTimeout(() => document.body.removeChild(statusBar), 400);
        }, 1800);
    }

    setupPresetButtons();

    const observer = new MutationObserver(() => {
        setupPresetButtons();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
