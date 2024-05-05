<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'menuName', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from '../../data/authority.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, TreeItem } from '@/components/Tree';

  import { getMenuList } from '@/api/demo/system';
  import { createAuthority, getAuthorityById, updateAuthority } from '@/api/system/authority';
  import { IAuthorityInfo } from '@/api/system/model/authorityModel';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);
  const parentId = ref<string>('');
  const authorityDetail = ref<IAuthorityInfo>({} as any);
  const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    isUpdate.value = !!data?.isUpdate;
    parentId.value = data.parentId;

    resetFields();
    setDrawerProps({ confirmLoading: false });
    if (unref(treeData).length === 0) {
      treeData.value = (await getMenuList()) as any as TreeItem[];
    }

    if (unref(isUpdate)) {
      const authority = (await getAuthorityById(data.record.id)) || ({} as any);
      setFieldsValue(authority);
      authorityDetail.value = authority;
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增权限' : '编辑权限'));

  async function createAuthorityByData(authData: any) {
    const user = Object.assign({}, authData);

    return await createAuthority(user);
  }

  async function updateAuthorityByData(authData: any) {
    const user = Object.assign({}, { id: authorityDetail.value.id }, authData);

    return await updateAuthority(user);
  }

  async function handleSubmit() {
    try {
      await validate();
      setDrawerProps({ confirmLoading: true });
      const authority = getFieldsValue();

      if (parentId.value) {
        authority.parentId = parentId.value;
      }
      if (!unref(isUpdate)) {
        await createAuthorityByData(authority);
      } else {
        await updateAuthorityByData(authority);
      }

      closeDrawer();
      emit('success', parentId.value);
    } catch (e) {
      console.error('err:', e);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
