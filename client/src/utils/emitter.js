import EventEmitter from 'events';

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); //khong giai han so nguoi nghe

export const emitter = _emitter;