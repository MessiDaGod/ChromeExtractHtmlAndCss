(function() {
    const styleSheets = Array.from(document.styleSheets);
    let cssText = '';

    styleSheets.forEach((styleSheet) => {
      try {
        if (styleSheet.cssRules) {
          const cssRules = Array.from(styleSheet.cssRules);
          cssRules.forEach((rule) => {
            cssText += rule.cssText + '\n';
          });
        }
      } catch (e) {
        console.log("Can't read the css rules of: " + styleSheet.href, e);
      }
    });

    const scriptTags = document.querySelectorAll('script');
    scriptTags.forEach((scriptTag) => {
      if (scriptTag.textContent.includes('.set(')) {
        scriptTag.remove();
      }
    });

    let pageDataText = '<style>\n' + cssText + '\n</style>\n';
    pageDataText += document.documentElement.outerHTML;

    const blob = new Blob([pageDataText], { type: 'text/txt;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'page.html');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  })();
