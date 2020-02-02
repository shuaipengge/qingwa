<template>
  <div>
    <avue-crud
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  data = {};

  option = {
    title: "课程管理",
    column: [
      { prop: "name", label: "课程名称" },
      { prop: "cover", label: "课程封面图" }
    ]
  };

  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }

  async create(row, done, loading) {
    await this.$http.post('courses', row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async update(row, index, done, loading){
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`courses/${row._id}`, data)
    this.$message.success('修改成功')
    this.fetch()
    done()
  }

  async remove(row) {
    try {
      await this.$confirm("是否确认删除？");
    } catch (e) {
      return;
    }
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }

  created() {
    this.fetch();
  }
}
</script>

<style>
</style>