import randomId from '@geeeger/random-id';

export default function alert(message: string): Promise<never> {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    div.className = 'geeeger-alert';
    div.id = randomId();
    const template = `<div class="box"><div class="info">${message}</div><div class="foot">确定</div></div>`;
    div.innerHTML = template;
    document.body.appendChild(div);
    const target = document.getElementById(div.id);
    if (target) {
      const confirm = target.querySelector('.foot');
      if (confirm) {
        confirm.addEventListener('click', () => {
          document.body.removeChild(target);
          resolve();
        });
      }
    }
  });
}
