<!--<script lang="ts">-->
<!--    import {dndzone, SOURCES, TRIGGERS} from 'svelte-dnd-action';-->
<!--    import {flip} from 'svelte/animate';-->

<!--    let clazz = "flex flex-col";-->
<!--    export {clazz as class};-->
<!--    export let items: { id: string }[] = [];-->

<!--    const flipDurationMs = 200;-->
<!--    let dragDisabled = true;-->

<!--    function handleConsider(e) {-->
<!--        const {items: newItems, info: {source, trigger}} = e.detail;-->
<!--        items = newItems;-->
<!--        // Ensure dragging is stopped on drag finish via keyboard-->
<!--        if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {-->
<!--            dragDisabled = true;-->
<!--        }-->
<!--    }-->

<!--    function handleFinalize(e) {-->
<!--        const {items: newItems, info: {source}} = e.detail;-->
<!--        items = newItems;-->
<!--        // Ensure dragging is stopped on drag finish via pointer (mouse, touch)-->
<!--        if (source === SOURCES.POINTER) {-->
<!--            dragDisabled = true;-->
<!--        }-->
<!--    }-->

<!--    function startDrag(e) {-->
<!--        e.preventDefault();-->
<!--        dragDisabled = false;-->
<!--    }-->

<!--    // function handleKeyDown(e) {-->
<!--    // if ((e.key === "Enter" || e.key === " ") && dragDisabled) dragDisabled = false;-->
<!--    // }-->

<!--</script>-->
<!--<ol class={clazz}-->
<!--    use:dndzone="{{ items, dragDisabled, flipDurationMs, dropTargetStyle:{outline: 'rgba(0, 199, 119, 0.25) solid 2px'}}}"-->
<!--    on:consider="{handleConsider}"-->
<!--    on:finalize="{handleFinalize}"-->
<!--&gt;-->
<!--    {#each items as item, i (item.id)}-->
<!--        &lt;!&ndash;        TODO add slide (it doesn't work simply with sortin)&ndash;&gt;-->

<!--        <li class="relative pb-4" animate:flip="{{ duration: flipDurationMs }}">-->
<!--                <slot item={item} {startDrag} index={i} {dragDisabled}></slot>-->
<!--        </li>-->
<!--    {/each}-->
<!--</ol>-->

<script lang="ts">
  /* USAGE
        <DraggableItemsList bind:items={resources} let:item={contentItem} let:startDrag let:index
                            let:dragDisabled>
            <div>
            <a href={contentItem.url}>
                contentItem.name
                <EditButtonGroup {dragDisabled}
                                 {startDrag}
                                 onEdit={(e)=>onEdit(e,contentItem)}/>

            </a>
            <button
                    tabindex={dragDisabled? 0 : -1}
                    aria-label="drag-handle"
                    class:cursor-grab={dragDisabled}
                    class:cursor-grabbing={!dragDisabled}
                    on:mousedown={startDrag}
                    on:touchstart={startDrag}
            >
                drag
            </button>
        </DraggableItemsList>
     */
</script>
