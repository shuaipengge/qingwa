<template>
  <div>
    <avue-crud
      :data="data.data"
      :page="page"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  @Prop(String) resource: string;
  data = {};
  option = {};
  page: any = {
    // pageSize: 2,
    // pageSizes: [2, 5, 10, 20],
    total: 0
  };
  query: any = {
    limit: 2
  };

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }

  async create(row, done, loading) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("创建成功");
    this.fetch();
    done();
  }

  async update(row, index, done, loading) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("修改成功");
    this.fetch();
    done();
  }

  async remove(row) {
    try {
      await this.$confirm("是否确认删除？");
    } catch (e) {
      return;
    }
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }

  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style>
</style>