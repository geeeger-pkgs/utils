import randomId from '@geeeger/random-id';

export default function confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
        const div = document.createElement('div');
        div.className = 'geeeger-confirm';
        div.id = randomId();
        const template = `<div class="box"><div class="info">${message}</div><div class="foot"><div class="ok">确定</div><div class="cancel">取消</div></div></div>`;
        div.innerHTML = template;
        document.body.appendChild(div);
        const target = document.getElementById(div.id);
        if (target) {
            const confirmBtn = target.querySelector('.ok');
            const cancel = target.querySelector('.cancel');
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    document.body.removeChild(target);
                    resolve(true);
                });
            }
            if (cancel) {
                cancel.addEventListener('click', () => {
                    document.body.removeChild(target);
                    resolve(false);
                });
            }
        }
    });
}
