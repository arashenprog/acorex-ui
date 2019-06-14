import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  Host,
  HostListener,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { AXToolbarItem } from '../toolbar-item';
import { MenuItem } from '../../../../core/menu.class';
declare var $: any;

@Component({
  selector: 'ax-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
  providers: [{ provide: AXToolbarItem, useExisting: AXToolbarMenuComponent }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXToolbarMenuComponent extends AXToolbarItem {
  constructor(private element: ElementRef, private zone: NgZone) {
    super();
  }

  //https://codepen.io/tauhidpro/pen/xpXrML
  showResponsiveMenu = false;

  @Input()
  items: MenuItem[] = [];

  @Output()
  itemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();





  onToolbarItemClick(item: MenuItem, event) {
    if (!(item.items && item.items.length)) {
      this.itemClick.emit(item);
      this.closeAll();
    }
    const el = (event.target as HTMLElement).querySelector('ul');
    if (el) {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        el.querySelectorAll('.active').forEach(c =>
          c.classList.remove('active')
        );
      } else {
        el.classList.add('active');
      }
    }
    event.stopPropagation();
  }

  // private bodyClick(event: MouseEvent) {
  //   this.closeAll();
  //   event.stopPropagation();
  // }

  private closeAll() {
    this.element.nativeElement
      .querySelectorAll('.active')
      .forEach(c => c.classList.remove('active'));
  }

  ngOnInit(): void {
    // this.zone.runOutsideAngular(() => {
    //   window.document.addEventListener('click', this.bodyClick.bind(this));
    // });
  }

  ngAfterViewInit(): void {
    $( '.dropdown-menu a.dropdown-toggle' ).on( 'click', function ( e ) {
      var $el = $( this );
      var $parent = $( this ).offsetParent( ".dropdown-menu" );
      if ( !$( this ).next().hasClass( 'show' ) ) {
          $( this ).parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );
      }
      var $subMenu = $( this ).next( ".dropdown-menu" );
      $subMenu.toggleClass( 'show' );
      
      $( this ).parent( "li" ).toggleClass( 'show' );

      $( this ).parents( 'li.nav-item.dropdown.show' ).on( 'hidden.bs.dropdown', function ( e ) {
          $( '.dropdown-menu .show' ).removeClass( "show" );
      } );
      
       if ( !$parent.parent().hasClass( 'navbar-nav' ) ) {
          $el.next().css( { "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 } );
      }

      return false;
  } );
  }

  ngOnDestroy(): void {
    //document.removeEventListener("click", this.bodyClick);
  }

  onResponsiveMenuButtonClick() {
    this.showResponsiveMenu = !this.showResponsiveMenu;
  }


}
