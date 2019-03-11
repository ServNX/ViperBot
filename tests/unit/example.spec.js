import { shallowMount } from '@vue/test-utils';
import Statistics from '@/components/Statistics';

describe('Statistics.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Statistics, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
