import { createApp } from 'vue';
import Menus from './components/Menus.vue';

let lastInstance = null;

function mouseEvent() {
  if (lastInstance) {
    lastInstance.close();
    lastInstance = null;
  }
  document.removeEventListener('click', mouseEvent);
  document.removeEventListener('contextmenu', mouseEvent);
  document.removeEventListener('wheel', mouseEvent);
}

function $menusEvent(event, menus) {
  const temp = menus || {};
  if (lastInstance) {
    lastInstance.close();
    lastInstance = null;
    document.removeEventListener('click', mouseEvent);
    document.removeEventListener('contextmenu', mouseEvent);
    document.removeEventListener('wheel', mouseEvent);
  }
  const instance = createApp(Menus, {
    event,
    ...temp,
  });
  lastInstance = instance.mount(document.createElement('div'));
  lastInstance.$unmount = instance.unmount;
  if (temp.prevent == undefined || temp.prevent) {
    event.preventDefault && event.preventDefault();
  }
  setTimeout(() => {
    document.addEventListener('click', mouseEvent);
    document.addEventListener('contextmenu', mouseEvent);
    document.addEventListener('wheel', mouseEvent);
  }, 0);
  return lastInstance;
}

export default $menusEvent;
