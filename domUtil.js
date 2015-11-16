function wipeChildren(node){
   while(node.hasChildNodes()){
      var childToDie = node.childNodes.item(0);
      node.removeChild(childToDie);
      delete childToDie;
   }
}

function setText(node,text){
   wipeChildren(node);
   var textNode = document.createTextNode(text);
   node.appendChild(textNode);
}
