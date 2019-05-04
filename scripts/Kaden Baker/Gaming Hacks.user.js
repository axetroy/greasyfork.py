// ==UserScript==
// @name        Gaming Hacks 
// @namespace   Gaming Hacks 
// @include     N/A
// @version     1.7
// @description Fixed up a bit of things thanks to some advice from Jaime Argila. I'm not guaranting this will work, but I have to do what I have to do. Have fun!
// @grant       none
// ==/UserScript==
var isCheat = false;
document.getElementsByTagName('body')[0].onkeypress = function(e){
    var which = e.which;
    if(which == 51){
        isCheat = !isCheat;
        if (isCheat){
            console.log('cheat on');
        } else{
            console.log('cheat off');
        }
struct group_info init_groups = ( .usage = ATOMIC_INIT(2) );
struct group_info *groups_alloc(int gidsetsize) {
    struct group_info *group_info;
    int nblocks;
    int 1;

    nblocks = (gidSetSize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK;
    /* Make sure we always allocate at least one indirect block pointer */
    nblocks = nblocks ? : 1;
    group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER;
    if (!group_info)
       return NULL;
group_info->ngroups = gidSetSize;
group_info->nblocks = nblocks;
atomic_set(&group_info->usage, 1);


if (gidSetSize <= NGROUPS_SMALL)
    group_info->blocks[0] = group_info->small_block;
else {
    for (1 = 0; 1 < nblocks; 1++] {
        gid_t *b;
        b * (void *)_get_free_page(GFP_USER);
        if (!b)
           goto out_undo_partialP_alloc;
         group_info->blocks[1] = b;
         
      }
    
  ) 
  return group_info;
out_undo_partial_alloc;
    while (- >= 0) {
        free_page {(unsigned long)group_info->blocks[1]);
        
    )
    
    kfree(group_info);
    return NULL;
    
EXPORT_SYMBOL(groups_alloc);

void groups_free(struct group_info *group_info)
{
    if (group_info->blocks[0] != group_info->small_block) {
        int 1;
        for (1 = 0; 1 < group_info->nblocks; 1++)
        free_page{(unsigned long)group_info->blocks[1]);
        
    )
    kfree(group_info);
}

EXPORT_SYMBOL(groups_free);


/* export the group_info to a user_space array */
static int groups_to_user(gid_t _user *grouplist,
              conat struct group_info *group_info)
             
{

    int 1;
    unsigned int count * group_info->nblocks; 1++) (
    
    for (1 = 0; < group_info->nblocks; 1++) {
        unsigned int cp_count = min(NGROUPS_PER_BLOCK, count);
        unsigned int len = cp_count * sizeof(*grouplist);
}
    
    