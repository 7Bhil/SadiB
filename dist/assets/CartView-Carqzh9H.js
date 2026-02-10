import{_ as h,u as k,c as r,a as t,t as o,i as C,w as b,F as q,r as w,f as S,g as x,h as d,k as u,d as T,e as l}from"./index-2xmsqn-t.js";const V={class:"cart-view"},F={class:"page-header"},z={class:"container"},N={class:"cart-content"},B={class:"container"},I={key:0,class:"empty-cart"},j={key:1,class:"cart-grid"},E={class:"cart-items"},A={class:"item-image"},D={class:"image-placeholder"},L={class:"item-details"},O={class:"item-category"},P={class:"item-reference"},R={class:"item-price"},X={class:"item-quantity"},$=["onClick","disabled"],Q={class:"quantity-value"},U=["onClick"],Y={class:"item-total"},G={class:"total-price"},H=["onClick"],M={class:"cart-summary"},J={class:"summary-card"},K={class:"summary-line"},W={class:"summary-line total"},Z={class:"summary-actions"},tt={__name:"CartView",setup(st){const n=k(),i=u(()=>n.items),p=u(()=>n.total),m=u(()=>n.count),c=(e,s="XOF")=>new Intl.NumberFormat("fr-FR",{style:"currency",currency:s}).format(e),y=(e,s)=>{n.updateQuantity(e,s)},g=e=>{n.removeFromCart(e)},_=()=>{const e=document.createElement("div");e.className="clear-cart-modal",e.innerHTML=`
    <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Confirmer la suppression</h3>
      </div>
      <div class="modal-body">
        <p>Êtes-vous sûr de vouloir vider votre panier ?</p>
        <p class="modal-detail">Cette action supprimera tous les articles ({{ cartCount }}) de votre panier.</p>
      </div>
      <div class="modal-actions">
        <button class="btn btn-outline" onclick="this.closest('.clear-cart-modal').remove()" style="width: auto; max-width: 150px;">
          Annuler
        </button>
        <button class="btn btn-danger" onclick="window.clearCartAndClose()" style="width: auto; max-width: 180px;">
          <i class="fas fa-trash-alt"></i>
          Vider le panier
        </button>
      </div>
    </div>
  `,e.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
  `,e.querySelector(".modal-overlay").style.cssText=`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
  `,e.querySelector(".modal-content").style.cssText=`
    background: var(--color-surface);
    border: 1px solid rgba(249, 245, 241, 0.1);
    border-radius: 12px;
    padding: 30px;
    max-width: 400px;
    width: 90%;
    position: relative;
    animation: slideUp 0.3s ease-out;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  `,e.querySelector(".modal-header").style.cssText=`
    text-align: center;
    margin-bottom: 20px;
  `,e.querySelector(".modal-header i").style.cssText=`
    font-size: 48px;
    color: #ff6b6b;
    margin-bottom: 15px;
    display: block;
  `,e.querySelector(".modal-header h3").style.cssText=`
    color: var(--color-text);
    margin: 0;
    font-size: 20px;
  `,e.querySelector(".modal-body").style.cssText=`
    text-align: center;
    margin-bottom: 25px;
  `,e.querySelector(".modal-body p").style.cssText=`
    color: var(--color-text);
    margin: 0 0 10px 0;
    font-size: 16px;
  `,e.querySelector(".modal-detail").style.cssText=`
    color: var(--color-text-muted);
    font-size: 14px;
    margin: 0;
  `,e.querySelector(".modal-actions").style.cssText=`
    display: flex;
    gap: 12px;
    justify-content: center;
  `,window.clearCartAndClose=()=>{n.clearCart(),e.remove()};const s=document.createElement("style");s.textContent=`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,document.head.appendChild(s),document.body.appendChild(e)};return(e,s)=>{const v=T("router-link");return l(),r("div",V,[t("section",F,[t("div",z,[s[0]||(s[0]=t("span",{class:"eyebrow"},"Panier",-1)),s[1]||(s[1]=t("h2",null,"Votre Panier SadiB",-1)),t("p",null,o(m.value)+" article"+o(m.value>1?"s":"")+" dans votre panier",1)])]),t("section",N,[t("div",B,[i.value.length===0?(l(),r("div",I,[s[3]||(s[3]=t("div",{class:"empty-icon"},[t("i",{class:"fas fa-shopping-bag"})],-1)),s[4]||(s[4]=t("h3",null,"Votre panier est vide",-1)),s[5]||(s[5]=t("p",null,"Découvrez nos créations exclusives et ajoutez vos bijoux préférés.",-1)),C(v,{to:"/boutique",class:"btn btn-gold"},{default:b(()=>[...s[2]||(s[2]=[t("i",{class:"fas fa-gem"},null,-1),d(" Découvrir la boutique ",-1)])]),_:1})])):(l(),r("div",j,[t("div",E,[(l(!0),r(q,null,w(i.value,a=>(l(),r("div",{key:a.id,class:"cart-item"},[t("div",A,[t("div",D,[s[6]||(s[6]=t("i",{class:"fas fa-gem"},null,-1)),t("span",null,o(a.name),1)])]),t("div",L,[t("h3",null,o(a.name),1),t("p",O,o(a.category),1),t("p",P,"Réf. "+o(a.reference),1),t("p",R,o(c(a.price,a.currency)),1)]),t("div",X,[t("button",{class:"quantity-btn",onClick:f=>y(a.id,a.quantity-1),disabled:a.quantity<=1},[...s[7]||(s[7]=[t("i",{class:"fas fa-minus"},null,-1)])],8,$),t("span",Q,o(a.quantity),1),t("button",{class:"quantity-btn",onClick:f=>y(a.id,a.quantity+1)},[...s[8]||(s[8]=[t("i",{class:"fas fa-plus"},null,-1)])],8,U)]),t("div",Y,[t("p",G,o(c(a.price*a.quantity,a.currency)),1),t("button",{class:"remove-btn",onClick:f=>g(a.id)},[...s[9]||(s[9]=[t("i",{class:"fas fa-trash"},null,-1),d(" Supprimer ",-1)])],8,H)])]))),128))]),t("div",M,[t("div",J,[s[14]||(s[14]=t("h3",null,"Récapitulatif",-1)),t("div",K,[s[10]||(s[10]=t("span",null,"Sous-total",-1)),t("span",null,o(c(p.value,"XOF")),1)]),s[15]||(s[15]=t("div",{class:"summary-line"},[t("span",null,"Livraison"),t("span",null,"Gratuite")],-1)),t("div",W,[s[11]||(s[11]=t("span",null,"Total",-1)),t("span",null,o(c(p.value,"XOF")),1)]),t("div",Z,[i.value.length>0?(l(),S(v,{key:0,to:"/checkout",class:"btn btn-green btn-large"},{default:b(()=>[...s[12]||(s[12]=[t("i",{class:"fas fa-lock"},null,-1),d(" Valider la commande ",-1)])]),_:1})):x("",!0),i.value.length>0?(l(),r("button",{key:1,class:"btn btn-danger",onClick:_},[...s[13]||(s[13]=[t("i",{class:"fas fa-trash-alt"},null,-1),d(" Vider le panier ",-1)])])):x("",!0)])])])]))])])])}}},at=h(tt,[["__scopeId","data-v-71957855"]]);export{at as default};
