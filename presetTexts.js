// ==UserScript==
// @name         预设文本填充器
// @namespace    https://github.com/virtuecho/virtuecho.github.io/blob/main/presetTexts.js
// @version      2025-10-01-4.0
// @description  在输入框中填充预设文本，避免TrustedHTML错误
// @updateURL    https://github.com/virtuecho/virtuecho.github.io/blob/main/presetTexts.js
// @downloadURL  https://github.com/virtuecho/virtuecho.github.io/blob/main/presetTexts.js
// @author       Your Name
// @match        https://chat.deepseek.com/*
// @match        https://gemini.google.com/*
// @match        https://chatgpt.com/*
// @match        https://yuanbao.tencent.com/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==
// @match        *://*/*

(function() {
    'use strict';

    // 添加自定义样式
    GM_addStyle(`
        .preset-buttons-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            z-index: 9999;
            position: relative;
        }

        .preset-button {
            background-color: #4a6fa5;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .preset-button:hover {
            background-color: #3a5a8c;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .preset-button:active {
            transform: translateY(0);
        }

        .preset-button-group {
            display: flex;
            gap: 5px;
        }

        .preset-button-highlight {
            animation: highlight 0.8s ease;
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

    // 预设文本库
    const defaultPresetTexts = [
        { name: "CCC", text: "I am about to send you the contents that our teacher gave us. Please help me to explain the ideas, concepts and the meanings of these contents below. The more detailed the better, so that I can understand! Please explain what this contents is talking about, and remember to use Simplified Chinese. The clearer the better, DO NOT OUTPUT in LaTeX math formatting and/or LaTeX math syntax:\n\n" },
        { name: "TTT", text: "Continue to translate these below, remember YOU ARE designed to act as a sophisticated translator, translating any given language into Simplified Chinese. It focuses on achieving natural, fluid, and authentic expressions in the translations, avoiding a translational tone. The translations provided will strive for elegance and sophistication in word choice, ensuring that the meaning of EVERY SINGLE SENTENCE AND WORDS is conveyed accurately and gracefully. Additionally, please retain the original terminology with annotations. NO explanation before and after translation, NO SUMMARIES, NO Brackets, NO （注：）, KEEP MARKDOWN FORMAT with html, KEEP THE ORIGINAL LINKS IN TEXT:\n\n" }
    ];

    // 从存储中获取预设文本或使用默认值
    let presetTexts = GM_getValue('presetTexts', defaultPresetTexts);

    // 注册菜单命令用于编辑预设文本
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

    // 支持的输入框选择器
    const inputSelectors = [
        '.ql-editor', // Quill编辑器
        '._27c9245.ds-scroll-area.d96f2d2a', // DeepSeek
        'ql-editor.textarea.new-input-ui', // Gemini
        '[contenteditable="true"]', // 通用可编辑区域
        'textarea', // 普通文本域
        'input[type="text"]', // 文本输入框
        '.ProseMirror', // Tiptap编辑器
        '.DraftEditor-root', // Draft.js编辑器
    ];

    // 查找输入框并添加按钮
    function setupPresetButtons() {
        // 查找所有支持的输入框
        let editors = [];
        inputSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                // 过滤掉隐藏的元素
                if (el.offsetWidth > 0 && el.offsetHeight > 0) {
                    // 检查是否已经添加过按钮
                    if (!el.dataset.presetButtonsAdded) {
                        editors.push(el);
                        el.dataset.presetButtonsAdded = "true";
                    }
                }
            });
        });

        if (editors.length === 0) {
            return;
        }

        // 为每个输入框添加按钮组
        editors.forEach(editor => {
            // 查找最近的合适父容器
            let container = findSuitableContainer(editor);

            // 创建按钮容器
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'preset-buttons-container';

            // 创建按钮组标题
            const title = document.createElement('div');
            title.textContent = '预设文本:';
            title.style.fontWeight = 'bold';
            title.style.marginBottom = '8px';
            title.style.width = '100%';
            buttonContainer.appendChild(title);

            // 创建按钮组
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'preset-button-group';

            // 为每个预设文本创建按钮
            presetTexts.forEach(preset => {
                const button = document.createElement('button');
                button.className = 'preset-button';
                button.textContent = preset.name;
                button.dataset.text = preset.text;

                button.addEventListener('click', () => {
                    // 添加点击反馈
                    button.classList.add('preset-button-highlight');
                    setTimeout(() => {
                        button.classList.remove('preset-button-highlight');
                    }, 800);

                    fillEditor(editor, preset.text);
                });

                buttonGroup.appendChild(button);
            });

            buttonContainer.appendChild(buttonGroup);

            // 将按钮容器插入到容器中
            container.insertBefore(buttonContainer, editor);
        });
    }

    // 查找合适的容器来放置按钮
    function findSuitableContainer(editor) {
        // 尝试查找最近的合适父元素
        let container = editor;
        for (let i = 0; i < 5; i++) {
            container = container.parentElement;
            if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
                if (container.classList.contains('ql-container') ||
                    container.classList.contains('text-input-field') ||
                    container.classList.contains('text-input-field_textarea-inner')) {
                    return container;
                }
            }
        }

        // 如果找不到合适的容器，使用直接父元素
        return editor.parentElement;
    }

    // 安全填充编辑器并设置光标位置
    function fillEditor(editor, text) {
        try {
            // 检查输入框是否可编辑
            if (editor.hasAttribute('contenteditable') && editor.getAttribute('contenteditable') !== 'true') {
                showStatus("输入框当前不可编辑", "error");
                return;
            }

            // 安全填充方法 - 避免使用innerHTML
            safeFillContent(editor, text);

            // 设置光标到末尾
            setCursorToEnd(editor);

            // 触发输入事件（确保编辑器检测到内容变化）
            triggerInputEvents(editor);

            showStatus("预设文本已填充", "success");
        } catch (e) {
            console.error("填充文本时出错:", e);
            showStatus("填充失败: " + e.message, "error");
        }
    }

    // 安全填充内容的方法
    function safeFillContent(editor, text) {
        // 方法1: 使用textContent（适用于纯文本）
        if (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') {
            editor.value = text;
        } else {
            // 方法2: 使用DocumentFragment（避免TrustedHTML错误）
            const fragment = document.createDocumentFragment();
            const lines = text.split('\n');

            lines.forEach((line, index) => {
                const p = document.createElement('p');
                p.textContent = line;
                fragment.appendChild(p);

                // 最后一个元素后不加空行
                if (index < lines.length - 1) {
                    fragment.appendChild(document.createElement('br'));
                }
            });

            // 清空编辑器内容
            while (editor.firstChild) {
                editor.removeChild(editor.firstChild);
            }

            // 添加新内容
            editor.appendChild(fragment);
        }
    }

    // 设置光标到末尾
    function setCursorToEnd(editor) {
        editor.focus();

        if (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') {
            editor.setSelectionRange(editor.value.length, editor.value.length);
        } else {
            const range = document.createRange();
            const selection = window.getSelection();

            if (editor.lastChild) {
                range.setStart(editor.lastChild, editor.lastChild.length || 0);
            } else {
                range.setStart(editor, 0);
            }

            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    // 触发输入事件
    function triggerInputEvents(editor) {
        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });
        editor.dispatchEvent(inputEvent);
        editor.dispatchEvent(changeEvent);
    }

    // 显示状态反馈
    function showStatus(message, type) {
        const statusBar = document.createElement('div');
        statusBar.textContent = message;
        statusBar.style.position = 'fixed';
        statusBar.style.bottom = '20px';
        statusBar.style.right = '20px';
        statusBar.style.padding = '10px 20px';
        statusBar.style.borderRadius = '4px';
        statusBar.style.color = 'white';
        statusBar.style.zIndex = '99999';
        statusBar.style.fontFamily = 'Arial, sans-serif';
        statusBar.style.fontSize = '14px';
        statusBar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';

        if (type === 'success') {
            statusBar.style.backgroundColor = '#4CAF50';
        } else if (type === 'error') {
            statusBar.style.backgroundColor = '#f44336';
        } else {
            statusBar.style.backgroundColor = '#2196F3';
        }

        document.body.appendChild(statusBar);

        setTimeout(() => {
            statusBar.style.transition = 'opacity 0.5s';
            statusBar.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(statusBar);
            }, 500);
        }, 2000);
    }

    // 初始设置
    setupPresetButtons();

    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                setupPresetButtons();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
