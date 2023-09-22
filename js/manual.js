const toc = document.querySelector('.table-of-contents');
const headings = document.querySelectorAll('h2, h3');

let lastH2Item = null;

headings.forEach((heading) => {
  const level = heading.tagName.toLowerCase();
  const title = heading.textContent;
  const anchor = heading.id;

  const link = document.createElement('a');
  link.textContent = title;
  link.setAttribute('href', `#${anchor}`);

  const item = document.createElement('li');
  item.appendChild(link);

  if (level === 'h2') {
    const sublist = document.createElement('ul');
    item.appendChild(sublist);
    toc.querySelector('ul').appendChild(item);
    lastH2Item = item;
  } else if (level === 'h3' && lastH2Item) {
    const sublist = document.createElement('ul');
    item.appendChild(sublist);
    lastH2Item.querySelector('ul').appendChild(item);
  }

  heading.addEventListener('click', () => {
    location.hash = anchor;
  });
});
