<template>
  <table class="aa-table responsive">
    <thead>
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTable',
});
</script>

<style lang="scss">
/* Responsive TABLE ------------------------------------------------------ */
.aa-table {
  width: 100%;
  border-collapse: collapse;
}

/* block columns that has data-label, regular columns to have click event, so it will only work on the edit delete buttons column */
.aa-table td:not([data-label='']) a {
  /* color: var(--bs-body-color); */
  text-decoration: none;
  /* pointer-events: none; */
}

.aa-table thead .material-symbols-outlined {
  vertical-align: middle;
  height: 1.8rem;
}

.aa-table thead tr th {
  vertical-align: middle;
  text-align: left;
  border-bottom: 4px solid rgb(55, 65, 81);
}

.aa-table thead tr th.text-actions {
  text-align: right;
}

/* From Bootstrap */
.aa-table {
  width: 100%;
  margin-bottom: 1rem;
  vertical-align: top;
}

.aa-table > :not(caption) > * > * {
  padding: 0.8rem 0.4rem 0.4rem 0.4rem;
  color: #fff;
  vertical-align: middle;
}

.aa-table > tbody {
  vertical-align: inherit;
}

.aa-table tbody tr {
  background-color: rgba(55, 65, 81, 0);
  border-bottom: 1px solid rgb(55, 65, 81);
  transition: all 0.3s;
}

.aa-table tbody tr:hover {
  background-color: rgba(55, 65, 81, 1);
}

.aa-table tbody tr.division {
  border-bottom: 4px solid rgb(55, 65, 81);
}

.aa-table > thead {
  vertical-align: bottom;
}

/* Responsive Table */
@media (max-width: 768px) {
  .aa-table td:not([data-label='']) a {
    color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
    text-decoration: underline;
    /* pointer-events: all; */
  }

  .aa-table tbody tr.division {
    border: none;
  }

  .aa-table.responsive thead {
    visibility: hidden;
    height: 0;
    position: absolute;
  }

  .aa-table.responsive tr {
    display: block;
    margin-bottom: 1rem;
    border: rgba(17, 24, 39, 1) solid 1px;
    border-radius: 0.5rem;
    background-color: rgba(17, 24, 39, 0.5);
  }

  .aa-table.responsive td,
  .aa-table.responsive th {
    display: flex;
    flex-direction: column;
    border: none;
    font-size: 1rem;
    min-height: 3.2rem;
    line-height: 1.6rem;
    padding: 0.8rem 1.6rem;
  }

  .aa-table.responsive td:first-child,
  .aa-table.responsive th:first-child {
    padding: 1.6rem 1.6rem 0.8rem 1.6rem;
  }

  .aa-table.responsive td:last-child,
  .aa-table.responsive th:last-child {
    padding: 0.8rem 1.6rem 1.6rem 1.6rem;
  }

  .aa-table.responsive td::before {
    content: attr(data-label);
    font-weight: bold;
    font-size: 1.1rem;
  }

  .aa-table.responsive td:last-child a {
    padding: 0 0 0 1rem;
  }
}
</style>
