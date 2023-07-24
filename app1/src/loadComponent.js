import { importRemote } from '@module-federation/utilities';

export const loadComponent = (remote, sharedScope, module, url) => {
  return async () => {
    await importRemote({
      url: url,
      scope: sharedScope,
      module: module,
    })
    const container = window[remote];
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
};
