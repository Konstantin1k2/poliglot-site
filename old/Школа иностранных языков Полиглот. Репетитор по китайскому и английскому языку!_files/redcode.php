
    var scriptTagManager = document.createElement('script');

    scriptTagManager.setAttribute('src', 'https://prod-dv.ru/administrator/components/com_crmmadmin/data/func/tagmanager/js/tagmanager.js');
    scriptTagManager.setAttribute('crossorigin', 'anonymous');
    scriptTagManager.setAttribute('defer', '');
    scriptTagManager.setAttribute('type', 'text/javascript');

    document.querySelector('.redcode1').appendChild(scriptTagManager);

  var scriptUtmTracker = document.createElement('script');
  scriptUtmTracker.setAttribute('src', 'https://prod-dv.ru/administrator/components/com_crmmenedjer/data/func/utm_tracker/utm_tracker.js');
  scriptUtmTracker.setAttribute('type', 'text/javascript');
  document.querySelector('.redcode1').appendChild(scriptUtmTracker);
